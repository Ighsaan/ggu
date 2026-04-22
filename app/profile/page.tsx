import { FooterBar } from "@/components/dashboard/FooterBar";
import { TopBar } from "@/components/dashboard/TopBar";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { redirect } from "next/navigation";
import {
  getSessionUser,
  getUserAvatarUrl,
  getUserDisplayName,
  getUserProviderLabel,
} from "@/lib/supabase/user";
import styles from "./page.module.css";

function formatProviderLabel(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => entry.charAt(0).toUpperCase() + entry.slice(1))
    .join(", ");
}

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const userName = getUserDisplayName(user);
  const userAvatarUrl = getUserAvatarUrl(user);
  const providerLabel = formatProviderLabel(getUserProviderLabel(user));

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.topBarSlot}>
          <TopBar userName={userName} userAvatarUrl={userAvatarUrl} />
        </div>

        <section className={styles.body}>
          <article className={styles.card}>
            <h1 className={styles.title}>Your Profile</h1>
            <p className={styles.subtitle}>Account details for your GGU profile.</p>

            <div className={styles.profileHead}>
              <span className={styles.avatar}>
                {userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt={`${userName} profile`}
                    className={styles.avatarImage}
                  />
                ) : (
                  <span className={styles.avatarFallback}>
                    {userName.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              <div className={styles.identity}>
                <p className={styles.name}>{userName}</p>
                <p className={styles.handle}>{user.email ?? "No email available"}</p>
              </div>
            </div>

            <dl className={styles.metaList}>
              <div className={styles.metaRow}>
                <dt>User ID</dt>
                <dd>{user.id}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Provider</dt>
                <dd>{providerLabel}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Last sign-in</dt>
                <dd>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Unknown"}</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <ButtonLink href="/settings" className={styles.primaryAction}>
                Open settings
              </ButtonLink>
              <ButtonLink href="/dashboard" className={styles.ghostAction}>
                Back to dashboard
              </ButtonLink>
            </div>
          </article>
        </section>

        <div className={styles.footerSlot}>
          <FooterBar />
        </div>
      </section>
    </main>
  );
}
