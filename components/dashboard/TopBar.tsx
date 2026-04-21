import { ButtonLink } from "@/components/ui/ButtonLink";
import { Brand } from "./Brand";
import styles from "./TopBar.module.css";

export function TopBar() {
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
        <ButtonLink href="/login" className={styles.authButton}>
          REGISTER / SIGN IN
        </ButtonLink>

        <button
          className={styles.menuButton}
          type="button"
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
