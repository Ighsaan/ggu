import { redirect } from "next/navigation";
import { GoogleSignInCard } from "@/components/auth/GoogleSignInCard";
import { Card } from "@/components/ui/Card";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSessionUser } from "@/lib/supabase/user";
import styles from "./page.module.css";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  const { error } = await searchParams;
  const supabaseConfigured = isSupabaseConfigured();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.description}>
          Google is the only enabled auth method in the application layer right
          now. Supabase handles the provider flow and session lifecycle.
        </p>
      </section>

      {error ? <div className={styles.notice}>{error}</div> : null}

      <div className={styles.stack}>
        {supabaseConfigured ? (
          <GoogleSignInCard next="/dashboard" />
        ) : (
          <Card
            title="Supabase config is still needed"
            description="Add the Supabase project URL and anon key to your local env file and in Vercel before the auth flow can work."
          >
            <p className={styles.description}>
              Required variables: <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
            </p>
          </Card>
        )}

        <Card
          title="What this page expects"
          description="External setup is still required for Google OAuth and hosted deployment."
        >
          <p className={styles.description}>
            Once you finish the provider and environment configuration
            documented in <code>docs/SUPABASE-VERCEL-SETUP.md</code>, this
            sign-in route should work without further code changes.
          </p>
        </Card>
      </div>
    </main>
  );
}
