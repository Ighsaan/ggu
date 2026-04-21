import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { signInWithGoogleAction, signOutAction } from "@/lib/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSessionUser, getUserDisplayName } from "@/lib/supabase/user";
import styles from "./page.module.css";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getSessionUser();
  const { error } = await searchParams;
  const supabaseConfigured = isSupabaseConfigured();
  const displayName = user ? getUserDisplayName(user) : null;

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>GGU</p>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.description}>
          Simple auth entry point for the current build. Use Google to create a
          session and continue straight to the dashboard.
        </p>

        <div className={styles.statusStack}>
          <p
            className={`${styles.state} ${user ? styles.success : styles.neutral}`}
          >
            {user ? `Signed in as ${displayName}.` : "You are not signed in."}
          </p>

          {error ? (
            <p className={`${styles.state} ${styles.warning}`}>{error}</p>
          ) : null}

          {!supabaseConfigured ? (
            <p className={`${styles.state} ${styles.warning}`}>
              Supabase env is missing. Add <code>NEXT_PUBLIC_SUPABASE_URL</code>{" "}
              and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> before using login.
            </p>
          ) : null}
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <ButtonLink href="/dashboard">Open dashboard</ButtonLink>
              <form className={styles.form} action={signOutAction}>
                <Button type="submit" variant="secondary">
                  Sign out
                </Button>
              </form>
            </>
          ) : supabaseConfigured ? (
            <form className={styles.form} action={signInWithGoogleAction}>
              <input type="hidden" name="next" value="/dashboard" />
              <Button type="submit">Continue with Google</Button>
            </form>
          ) : null}

          <ButtonLink href="/dashboard" variant="subtle">
            View dashboard
          </ButtonLink>
        </div>
      </section>

      <section className={styles.panel}>
        <h2 className={styles.sectionTitle}>Current scope</h2>
        <ul className={styles.list}>
          <li>Only two user-facing pages: login and dashboard.</li>
          <li>The dashboard stays public and always shows auth status.</li>
          <li>
            Successful sign-ins create or update a row in{" "}
            <code>public.users</code>.
          </li>
        </ul>
      </section>
    </main>
  );
}
