export interface DbClient {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
}

export function getDbClient(): DbClient {
  throw new Error("Implement getDbClient() in lib/db/index.ts for your database provider.");
}
