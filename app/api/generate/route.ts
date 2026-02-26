import OpenAI from "openai";
import { NextResponse } from "next/server";

import type { SiteContent } from "@/lib/db/sites";

interface GenerateRequest {
  name: string;
  industry: string;
  tone: string;
  location: string;
  goal: string;
}

function createFallbackContent(input: GenerateRequest): SiteContent {
  return {
    sections: [
      {
        id: "hero",
        title: `${input.name} - ${input.industry}`,
        text: `${input.name} helps customers in ${input.location}. Tone: ${input.tone}. Primary goal: ${input.goal}.`,
      },
      {
        id: "services",
        title: "What We Offer",
        text: `Core services tailored for ${input.industry} customers with a focus on ${input.goal}.`,
      },
      {
        id: "cta",
        title: "Get Started",
        text: `Contact ${input.name} today to move forward with ${input.goal}.`,
      },
    ],
  };
}

function normalize(input: Partial<GenerateRequest>): GenerateRequest {
  return {
    name: String(input.name ?? "").trim(),
    industry: String(input.industry ?? "").trim(),
    tone: String(input.tone ?? "").trim(),
    location: String(input.location ?? "").trim(),
    goal: String(input.goal ?? "").trim(),
  };
}

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as Partial<GenerateRequest>;
    const input = normalize(raw);

    if (!input.name || !input.industry || !input.tone || !input.location || !input.goal) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ content: createFallbackContent(input) });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "You are an AI website content planner. Return JSON only with concise, high-quality sections.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Business name: ${input.name}\nIndustry: ${input.industry}\nTone: ${input.tone}\nLocation: ${input.location}\nGoal: ${input.goal}`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "site_content",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              sections: {
                type: "array",
                minItems: 3,
                maxItems: 8,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                    text: { type: "string" },
                  },
                  required: ["id", "title", "text"],
                },
              },
            },
            required: ["sections"],
          },
        },
      },
    });

    const outputText = response.output_text?.trim();

    if (!outputText) {
      return NextResponse.json({ content: createFallbackContent(input) });
    }

    const parsed = JSON.parse(outputText) as SiteContent;
    return NextResponse.json({ content: parsed });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
