import Link from "next/link";
import { signOutAction } from "@/lib/actions/auth";
import { getSessionUser } from "@/lib/supabase/user";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./SiteHeader.module.css";

export async function SiteHeader() {
  const user = await getSessionUser();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          GGU
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/dashboard" className={styles.link}>
            Dashboard
          </Link>
          <Link href="/login" className={styles.link}>
            Auth
          </Link>
          {user ? (
            <>
              <span className={styles.user}>{user.email ?? "Signed in"}</span>
              <form action={signOutAction}>
                <Button type="submit" variant="secondary">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <ButtonLink href="/login">Sign in with Google</ButtonLink>
          )}
        </nav>
      </div>
    </header>
  );
}
