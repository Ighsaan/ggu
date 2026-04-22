import { ButtonLink } from "@/components/ui/ButtonLink";
import { signOutAction } from "@/lib/actions/auth";
import { Brand } from "./Brand";
import styles from "./TopBar.module.css";

type TopBarProps = {
  userName?: string | null;
  userAvatarUrl?: string | null;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function TopBar({ userName, userAvatarUrl }: TopBarProps) {
  const isSignedIn = Boolean(userName);

  return (
    <header className={styles.bar}>
      <Brand />

      <label className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true" />
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </label>

      <div className={styles.actions}>
        {isSignedIn ? (
          <ButtonLink
            href="/profile"
            className={`${styles.authButton} ${styles.authButtonSignedIn}`}
          >
            <span className={styles.userAvatar}>
              {userAvatarUrl ? (
                <img
                  src={userAvatarUrl}
                  alt={`${userName} profile`}
                  className={styles.userAvatarImage}
                />
              ) : (
                <span className={styles.userAvatarFallback}>
                  {getInitials(userName ?? "")}
                </span>
              )}
            </span>
            <span className={styles.userName}>{userName}</span>
          </ButtonLink>
        ) : (
          <ButtonLink href="/login" className={styles.authButton}>
            REGISTER / SIGN IN
          </ButtonLink>
        )}

        <details className={styles.menu}>
          <summary className={styles.menuButton} aria-label="Open menu">
            <span />
            <span />
            <span />
          </summary>

          <div className={styles.menuPanel}>
            <ButtonLink href="/settings" className={styles.menuItem}>
              Settings
            </ButtonLink>
            {isSignedIn ? (
              <form action={signOutAction} className={styles.menuForm}>
                <button type="submit" className={styles.menuItemButton}>
                  Logout
                </button>
              </form>
            ) : (
              <ButtonLink href="/login" className={styles.menuItem}>
                Register / Sign in
              </ButtonLink>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
