import { Brand } from "@/components/dashboard/Brand";
import { FooterBar } from "@/components/dashboard/FooterBar";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { redirect } from "next/navigation";
import { signInWithGoogleAction } from "@/lib/actions/auth";
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
      <section className={styles.shell}>
        <header className={styles.bar}>
          <Brand />
        </header>

        <div className={styles.body}>
          <section className={styles.card}>
            <h1 className={styles.title}>
              <span>WELCOME TO</span>
              <span>GGU!!!</span>
            </h1>
            <p className={styles.subtitle}>Sign in to cast your vote</p>

            {(error || !supabaseConfigured) && (
              <div className={styles.statusStack}>
                {error ? (
                  <p className={`${styles.state} ${styles.warning}`}>{error}</p>
                ) : null}

                {!supabaseConfigured ? (
                  <p className={`${styles.state} ${styles.warning}`}>
                    Supabase env is missing. Add{" "}
                    <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                    <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> before using
                    login.
                  </p>
                ) : null}
              </div>
            )}

            <div className={styles.actions}>
              {supabaseConfigured ? (
                <>
                  <form className={styles.form} action={signInWithGoogleAction}>
                    <input type="hidden" name="next" value="/dashboard" />
                    <Button type="submit" className={styles.primaryButton}>
                      <GoogleGlyph />
                      <span>CONTINUE WITH GOOGLE</span>
                    </Button>
                  </form>
                  <ButtonLink
                    href="/dashboard"
                    variant="subtle"
                    className={styles.ghostButton}
                  >
                    VIEW DASHBOARD
                  </ButtonLink>
                </>
              ) : (
                <ButtonLink
                  href="/dashboard"
                  variant="subtle"
                  className={styles.ghostButton}
                >
                  VIEW DASHBOARD
                </ButtonLink>
              )}
            </div>
          </section>
        </div>

        <div className={styles.footerSlot}>
          <FooterBar />
        </div>
      </section>
    </main>
  );
}

function GoogleGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={styles.buttonIcon}
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M21.35 11.1h-9.2v2.9h5.28c-.23 1.44-1.66 4.22-5.28 4.22-3.18 0-5.77-2.63-5.77-5.87s2.59-5.87 5.77-5.87c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.86 3.82 14.75 3 12.15 3 6.98 3 2.83 7.15 2.83 12.35S6.98 21.7 12.15 21.7c7.02 0 9.37-4.92 9.37-8.64 0-.58-.06-1.03-.17-1.96z"
      />
    </svg>
  );
}
