"use client";
import styles from "./page.module.scss";
import Navbar from "./components/navbar";
import Loader from "./components/loader";
import { useEffect, useState } from "react";

const navLinks = [
  {
    link: "/frame",
    data: "Go to Surfing",
  },
  {
    link: "/analysis",
    data: "Go to Analysis",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds (3000 ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <Navbar link1={navLinks[0]} link2={navLinks[1]}></Navbar>

          <div className={styles.main}>
            <div className={styles.blur}></div>
            <div className={styles.title}>
              <p>Website</p>
              <p className={styles.center}>Activity</p>
              <p>Moniter</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
