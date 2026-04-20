import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { isDatabaseConfigured } from "@/db";
import { syncProfileFromUser } from "@/lib/data/profiles";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserProviderLabel,
  getSessionUser,
} from "@/lib/supabase/user";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?error=Please%20sign%20in%20to%20view%20the%20dashboard.");
  }

  const databaseConfigured = isDatabaseConfigured();
  let profileStatus: {
    tone: "neutral" | "success" | "warning";
    label: string;
    detail: string;
  } = {
    tone: databaseConfigured ? "neutral" : "warning",
    label: databaseConfigured ? "Database configured" : "Database env missing",
    detail: databaseConfigured
      ? "The app has a runtime database URL, but migrations still need to be applied in your Supabase project."
      : "Add DATABASE_URL before the Drizzle-powered profile sync can run.",
  };

  let profile: Awaited<ReturnType<typeof syncProfileFromUser>> = null;

  if (databaseConfigured) {
    try {
      profile = await syncProfileFromUser(user);
      profileStatus = {
        tone: "success",
        label: "Profile synced",
        detail:
          "Your Supabase-authenticated user profile can now be mirrored into the application database.",
      };
    } catch (error) {
      profileStatus = {
        tone: "warning",
        label: "Database not ready yet",
        detail:
          error instanceof Error
            ? error.message
            : "The app reached the database layer, but the initial migration may not have been applied yet.",
      };
    }
  }

  const displayName = getUserDisplayName(user);
  const avatarUrl = getUserAvatarUrl(user);
  const provider = getUserProviderLabel(user);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Protected route</p>
        <h1 className={styles.title}>Welcome, {displayName}.</h1>
        <p className={styles.description}>
          This dashboard proves that Supabase cookie-based auth is working in
          the App Router. It also attempts to sync a profile row through Drizzle
          when database configuration is present.
        </p>
      </section>

      <section className={styles.grid}>
        <Card
          title="Auth session"
          description="Details coming from the Supabase-authenticated user session."
        >
          <div className={styles.inline}>
            <Badge tone="success">Signed in</Badge>
            <Badge tone="neutral">Provider: {provider}</Badge>
          </div>
          <div className={styles.metaList}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Email</span>
              <span className={styles.metaValue}>
                {user.email ?? "Not available"}
              </span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>User ID</span>
              <span className={styles.metaValue}>{user.id}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Avatar URL</span>
              <span className={styles.metaValue}>
                {avatarUrl ?? "Not provided by Google"}
              </span>
            </div>
          </div>
        </Card>

        <Card
          title="Database sync"
          description="This card reflects the Drizzle + Supabase Postgres integration status."
        >
          <div className={styles.inline}>
            <Badge tone={profileStatus.tone}>{profileStatus.label}</Badge>
          </div>
          <p className={styles.description}>{profileStatus.detail}</p>
          {profile ? (
            <div className={styles.metaList}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Profile full name</span>
                <span className={styles.metaValue}>
                  {profile.fullName ?? "Not set"}
                </span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Created</span>
                <span className={styles.metaValue}>
                  {profile.createdAt.toISOString()}
                </span>
              </div>
            </div>
          ) : null}
        </Card>

        <Card
          title="What still needs your config"
          description="The repo is wired, but external accounts still need to be connected."
        >
          <ul className={styles.list}>
            <li>Create the Supabase project and enable Google auth.</li>
            <li>Add the environment variables locally and in Vercel.</li>
            <li>Run the initial migration against the Supabase database.</li>
            <li>
              Add local, preview, and production callback URLs in Supabase Auth
              settings.
            </li>
          </ul>
          <ButtonLink href="/login" variant="secondary">
            Revisit auth page
          </ButtonLink>
        </Card>

        <Card
          title="Deployment target"
          description="The hosting expectation remains Vercel."
        >
          <div className={styles.inline}>
            <Badge tone="neutral">Vercel</Badge>
          </div>
          <p className={styles.description}>
            Once the environment variables are configured in Vercel, preview
            deployments can exercise the same auth flow and server-side session
            logic as local development.
          </p>
        </Card>
      </section>
    </main>
  );
}
