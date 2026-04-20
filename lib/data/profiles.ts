import type { User } from "@supabase/supabase-js";
import { eq, sql } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { profiles } from "@/db/schema";
import { getUserAvatarUrl, getUserDisplayName } from "@/lib/supabase/user";

export async function syncProfileFromUser(user: User) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const db = getDb();
  const fullName = getUserDisplayName(user);
  const avatarUrl = getUserAvatarUrl(user);

  await db
    .insert(profiles)
    .values({
      userId: user.id,
      fullName,
      avatarUrl,
    })
    .onConflictDoUpdate({
      target: profiles.userId,
      set: {
        fullName,
        avatarUrl,
        updatedAt: sql`timezone('utc', now())`,
      },
    });

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  return profile ?? null;
}
