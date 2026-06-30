import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Reads Supabase config from the public env vars. Supports the newer
 * `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and falls back to the legacy
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Values are read from the environment only —
 * never hardcoded.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cachedClient: SupabaseClient | null = null;

/** True only when both URL and a public key are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

/**
 * Lazily create (and memoize) the Supabase client. Returns `null` when config is
 * missing so callers can fail safely — never constructs `createClient("", "")`,
 * so importing this module can never crash on render/build when env is absent.
 */
export function getSupabase(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  if (!supabaseUrl || !supabaseKey) return null;
  cachedClient = createClient(supabaseUrl, supabaseKey);
  return cachedClient;
}
