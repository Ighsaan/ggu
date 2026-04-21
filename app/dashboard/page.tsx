import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { isDatabaseConfigured } from "@/db";
import { signOutAction } from "@/lib/actions/auth";
import { syncAppUserFromAuth } from "@/lib/data/users";
import {
  getSessionUser,
  getUserDisplayName,
  getUserProviderLabel,
} from "@/lib/supabase/user";
import styles from "./page.module.css";

type SyncState = {
  tone: "success" | "warning" | "neutral";
  label: string;
  detail: string;
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  const databaseConfigured = isDatabaseConfigured();

  let appUser: Awaited<ReturnType<typeof syncAppUserFromAuth>> = null;
  let syncState: SyncState = databaseConfigured
    ? user
      ? {
          tone: "neutral",
          label: "Ready to sync",
          detail:
            "The dashboard will create or refresh your app user row while you are signed in.",
        }
      : {
          tone: "neutral",
          label: "No signed-in user",
          detail:
            "The dashboard is public. Sign in to create or refresh a row in public.users.",
        }
    : {
        tone: "warning",
        label: "Database not configured",
        detail:
          "Add DATABASE_URL before the app can sync the public.users table.",
      };

  if (user && databaseConfigured) {
    try {
      appUser = await syncAppUserFromAuth(user);
      syncState = {
        tone: "success",
        label: "User row synced",
        detail:
          "The authenticated user has been inserted or updated in public.users.",
      };
    } catch (error) {
      syncState = {
        tone: "warning",
        label: "User row sync failed",
        detail:
          error instanceof Error
            ? error.message
            : "The app reached the database layer, but the users table is not ready yet.",
      };
    }
  }

  const displayName = user ? getUserDisplayName(user) : null;
  const provider = user ? getUserProviderLabel(user) : null;

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>GGU</p>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>
          This dashboard is public on purpose. It always shows whether there is
          an active Supabase session, and it syncs the authenticated user into
          the app database when login succeeds.
        </p>

        <div className={styles.badges}>
          <span
            className={`${styles.badge} ${user ? styles.success : styles.neutral}`}
          >
            {user ? "Logged in" : "Not logged in"}
          </span>
          {provider ? (
            <span className={`${styles.badge} ${styles.neutral}`}>
              Provider: {provider}
            </span>
          ) : null}
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <ButtonLink href="/login" variant="secondary">
                Open login page
              </ButtonLink>
              <form className={styles.form} action={signOutAction}>
                <Button type="submit" variant="subtle">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <ButtonLink href="/login">Go to login</ButtonLink>
          )}
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <h2 className={styles.sectionTitle}>Session</h2>
          {user ? (
            <dl className={styles.details}>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Display name</dt>
                <dd className={styles.value}>{displayName}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Email</dt>
                <dd className={styles.value}>
                  {user.email ?? "Not available"}
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>User ID</dt>
                <dd className={styles.value}>{user.id}</dd>
              </div>
            </dl>
          ) : (
            <p className={styles.muted}>
              Anyone can open this route. Sign in if you want GGU to create or
              refresh your app user row.
            </p>
          )}
        </article>

        <article className={styles.panel}>
          <h2 className={styles.sectionTitle}>User table</h2>
          <p className={`${styles.state} ${styles[syncState.tone]}`}>
            {syncState.label}
          </p>
          <p className={styles.muted}>{syncState.detail}</p>

          {appUser ? (
            <dl className={styles.details}>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Table</dt>
                <dd className={styles.value}>public.users</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Email</dt>
                <dd className={styles.value}>{appUser.email ?? "Not set"}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Full name</dt>
                <dd className={styles.value}>
                  {appUser.fullName ?? "Not set"}
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Provider</dt>
                <dd className={styles.value}>
                  {appUser.provider ?? "Not set"}
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Last sign-in</dt>
                <dd className={styles.value}>
                  {appUser.lastSignInAt
                    ? appUser.lastSignInAt.toISOString()
                    : "Not set"}
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.label}>Updated at</dt>
                <dd className={styles.value}>
                  {appUser.updatedAt.toISOString()}
                </dd>
              </div>
            </dl>
          ) : null}
        </article>
      </section>
    </main>
  );
}
