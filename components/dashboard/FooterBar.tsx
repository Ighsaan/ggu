import { Brand } from "./Brand";
import styles from "./FooterBar.module.css";

const footerLinks = [
  "Contact Us",
  "Terms and Conditions",
  "Privacy Policy",
  "Enquiries",
] as const;

export function FooterBar() {
  return (
    <footer className={styles.footer}>
      <Brand compact />

      <div className={styles.links}>
        {footerLinks.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </div>
    </footer>
  );
}
