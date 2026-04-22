import { FooterBar } from "@/components/dashboard/FooterBar";
import { TopBar } from "@/components/dashboard/TopBar";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Button } from "@/components/ui/Button";
import { signOutAction } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import {
  getSessionUser,
  getUserAvatarUrl,
  getUserDisplayName,
} from "@/lib/supabase/user";
import styles from "./page.module.css";

export default async function SettingsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const userName = getUserDisplayName(user);
  const userAvatarUrl = getUserAvatarUrl(user);

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.topBarSlot}>
          <TopBar userName={userName} userAvatarUrl={userAvatarUrl} />
        </div>

        <section className={styles.body}>
          <article className={styles.card}>
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Basic account preferences.</p>

            <section className={styles.group}>
              <h2 className={styles.groupTitle}>Preferences</h2>
              <label className={styles.settingRow}>
                <span>Email updates about voted games</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className={styles.settingRow}>
                <span>Show profile publicly in community lists</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className={styles.settingRow}>
                <span>Use compact carousel cards</span>
                <input type="checkbox" />
              </label>
              <p className={styles.hint}>
                These are UI-ready placeholders for now and are not persisted yet.
              </p>
            </section>

            <section className={styles.group}>
              <h2 className={styles.groupTitle}>Account</h2>
              <div className={styles.accountRow}>
                <span>Email</span>
                <strong>{user.email ?? "No email available"}</strong>
              </div>
              <div className={styles.accountActions}>
                <Button type="button" className={styles.primaryAction}>
                  Save preferences
                </Button>
                <form action={signOutAction}>
                  <Button type="submit" className={styles.ghostAction}>
                    Logout
                  </Button>
                </form>
                <ButtonLink href="/profile" className={styles.ghostLink}>
                  Go to profile
                </ButtonLink>
              </div>
            </section>
          </article>
        </section>

        <div className={styles.footerSlot}>
          <FooterBar />
        </div>
      </section>
    </main>
  );
}
