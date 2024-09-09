import Link from "next/link";
import styles from "./navbar.module.scss"

const navLinks = [
  {
    link: "/frame",
    data: "Go to Surfing"
  },
  {
    link: "/analysis",
    data: "Go to Analysis"
  }
]

const Navbar = ({link1 = navLinks[0], link2 = navLinks[1]}) => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} href={link1.link}>
        <button className={styles.linkBtn}>{link1.data}</button>
        <span></span>
      </Link>
      <Link className={styles.link} href={link2.link}>
        <button className={styles.linkBtn}>{link2.data}</button>
        <span></span>
      </Link>
    </nav>
  );
};

export default Navbar;
