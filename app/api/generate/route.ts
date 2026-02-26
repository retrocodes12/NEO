import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const aboutSectionSchema = z.object({
  type: z.literal("about"),
  title: z.string().min(1),
  body: z.string().min(1),
});

const servicesSectionSchema = z.object({
  type: z.literal("services"),
  title: z.string().min(1),
  items: z.array(z.object({ title: z.string().min(1), body: z.string().min(1) })).min(1),
});

const testimonialsSectionSchema = z.object({
  type: z.literal("testimonials"),
  title: z.string().min(1),
  items: z.array(z.object({ name: z.string().min(1), quote: z.string().min(1) })).min(1),
});

const faqSectionSchema = z.object({
  type: z.literal("faq"),
  title: z.string().min(1),
  items: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(1),
});

const contactSectionSchema = z.object({
  type: z.literal("contact"),
  title: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
});

const generatedContentSchema = z
  .object({
    brand: z.object({
      name: z.string().min(1),
      industry: z.string().min(1),
      tone: z.string().min(1),
      location: z.string().min(1),
      goal: z.string().min(1),
    }),
    hero: z.object({
      headline: z.string().min(1),
      subheadline: z.string().min(1),
      primaryCta: z.string().min(1),
      secondaryCta: z.string().min(1),
    }),
    sections: z.array(
      z.discriminatedUnion("type", [
        aboutSectionSchema,
        servicesSectionSchema,
        testimonialsSectionSchema,
        faqSectionSchema,
        contactSectionSchema,
      ]),
    ),
    seo: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  })
  .superRefine((value, ctx) => {
    const requiredTypes = ["about", "services", "testimonials", "faq", "contact"] as const;

    for (const sectionType of requiredTypes) {
      const exists = value.sections.some((section) => section.type === sectionType);

      if (!exists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sections"],
          message: `Missing required section type: ${sectionType}`,
        });
      }
    }
  });

const generateInputSchema = z.object({
  name: z.string().min(1),
  industry: z.string().min(1),
  tone: z.string().min(1),
  location: z.string().min(1),
  goal: z.string().min(1),
});

const openAiOutputJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    brand: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        industry: { type: "string" },
        tone: { type: "string" },
        location: { type: "string" },
        goal: { type: "string" },
      },
      required: ["name", "industry", "tone", "location", "goal"],
    },
    hero: {
      type: "object",
      additionalProperties: false,
      properties: {
        headline: { type: "string" },
        subheadline: { type: "string" },
        primaryCta: { type: "string" },
        secondaryCta: { type: "string" },
      },
      required: ["headline", "subheadline", "primaryCta", "secondaryCta"],
    },
    sections: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        anyOf: [
          {
            type: "object",
            additionalProperties: false,
            properties: {
              type: { type: "string", enum: ["about"] },
              title: { type: "string" },
              body: { type: "string" },
            },
            required: ["type", "title", "body"],
          },
          {
            type: "object",
            additionalProperties: false,
            properties: {
              type: { type: "string", enum: ["services"] },
              title: { type: "string" },
              items: {
                type: "array",
                minItems: 1,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    title: { type: "string" },
                    body: { type: "string" },
                  },
                  required: ["title", "body"],
                },
              },
            },
            required: ["type", "title", "items"],
          },
          {
            type: "object",
            additionalProperties: false,
            properties: {
              type: { type: "string", enum: ["testimonials"] },
              title: { type: "string" },
              items: {
                type: "array",
                minItems: 1,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    name: { type: "string" },
                    quote: { type: "string" },
                  },
                  required: ["name", "quote"],
                },
              },
            },
            required: ["type", "title", "items"],
          },
          {
            type: "object",
            additionalProperties: false,
            properties: {
              type: { type: "string", enum: ["faq"] },
              title: { type: "string" },
              items: {
                type: "array",
                minItems: 1,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    q: { type: "string" },
                    a: { type: "string" },
                  },
                  required: ["q", "a"],
                },
              },
            },
            required: ["type", "title", "items"],
          },
          {
            type: "object",
            additionalProperties: false,
            properties: {
              type: { type: "string", enum: ["contact"] },
              title: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
            },
            required: ["type", "title", "email", "phone", "address"],
          },
        ],
      },
    },
    seo: {
      type: "object",
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        description: { type: "string" },
      },
      required: ["title", "description"],
    },
  },
  required: ["brand", "hero", "sections", "seo"],
} as const;

async function generateOnce(client: OpenAI, input: z.infer<typeof generateInputSchema>) {
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are an expert SaaS landing page copywriter.\n\nReturn ONLY valid JSON.\nDo not include markdown.\nDo not include explanations.\nDo not wrap output in code blocks.\n\nYou generate structured website content plans. Return strict JSON only. Never output HTML or markdown.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Generate website content JSON with exact required shape for this business:\n\n- name: ${input.name}\n- industry: ${input.industry}\n- tone: ${input.tone}\n- location: ${input.location}\n- goal: ${input.goal}`,
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "website_builder_content",
        strict: true,
        schema: openAiOutputJsonSchema,
      },
    },
  });

  const raw = response.output_text?.trim();

  if (!raw) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsed = JSON.parse(raw);
  return generatedContentSchema.parse(parsed);
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const json = (await request.json()) as unknown;
    const input = generateInputSchema.parse(json);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
      const content = await generateOnce(client, input);
      return NextResponse.json({ content });
    } catch {
      const content = await generateOnce(client, input);
      return NextResponse.json({ content });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues.map((issue) => issue.message).join("; ") }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
