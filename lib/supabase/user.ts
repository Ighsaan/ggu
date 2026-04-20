import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./server";
import { isSupabaseConfigured } from "./config";

function readMetadataString(user: User, key: string) {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function getUserDisplayName(user: User) {
  return (
    readMetadataString(user, "full_name") ??
    readMetadataString(user, "name") ??
    user.email ??
    "Signed in user"
  );
}

export function getUserAvatarUrl(user: User) {
  return readMetadataString(user, "avatar_url");
}

export function getUserProviderLabel(user: User) {
  const providers = user.app_metadata?.providers;

  if (Array.isArray(providers) && providers.length > 0) {
    return providers.join(", ");
  }

  const provider = user.app_metadata?.provider;
  return typeof provider === "string" && provider.length > 0
    ? provider
    : "google";
}

export async function getSessionUser() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
