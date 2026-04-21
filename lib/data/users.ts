import type { User } from "@supabase/supabase-js";
import { eq, sql } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { users } from "@/db/schema";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserProviderLabel,
} from "@/lib/supabase/user";

function getLastSignInAt(user: User) {
  if (!user.last_sign_in_at) {
    return null;
  }

  const value = new Date(user.last_sign_in_at);
  return Number.isNaN(value.getTime()) ? null : value;
}

export async function syncAppUserFromAuth(user: User) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const db = getDb();
  const email = user.email ?? null;
  const fullName = getUserDisplayName(user);
  const avatarUrl = getUserAvatarUrl(user);
  const provider = getUserProviderLabel(user);
  const lastSignInAt = getLastSignInAt(user);

  await db
    .insert(users)
    .values({
      id: user.id,
      email,
      fullName,
      avatarUrl,
      provider,
      lastSignInAt,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email,
        fullName,
        avatarUrl,
        provider,
        lastSignInAt,
        updatedAt: sql`timezone('utc', now())`,
      },
    });

  const [appUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  return appUser ?? null;
}
