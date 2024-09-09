"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./frame.module.scss";
import Navbar from "../components/navbar";

const navLinks = [
  {
    link: "/",
    data: "Go to Home",
  },
  {
    link: "/analysis",
    data: "Go to Analysis",
  },
];

const Frame = () => {
  const [url, setUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [showFrameWindow, setShowFrameWindow] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [visitedSites, setVisitedSites] = useState([]);

  const iFrame = useRef();

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  //for seeting the localStorage data
  useEffect(() => {
    // Load visited sites from local storage on mount
    const storedSites =
      JSON.parse(localStorage.getItem("visitedWebsites")) || [];
    setVisitedSites(storedSites);
  }, []);

  const handleIframeUnload = () => {
    if (startTime) {
      const timeSpent = Date.now() - startTime;
      const updatedWebsites = [...visitedSites];
      const domain = new URL(iframeUrl).hostname.replace(/^www\./, ''); 
      const existingWebsite = updatedWebsites.find(
        (site) => site.name === domain
      );

      if (existingWebsite) {
        // Update timeSpent if website already exists
        existingWebsite.timeSpent += timeSpent;
      } else {
        // Add new website entry
        updatedWebsites.push({ name: domain, timeSpent });
      }

      // Update local storage with new or updated website visit
      localStorage.setItem("visitedWebsites", JSON.stringify(updatedWebsites));
      setVisitedSites(updatedWebsites);
    }
  };

  const handleShowFrameFunction = () => {
    setShowFrameWindow((pre) => !pre);
    if (showFrameWindow) {
      handleIframeUnload();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFrameWindow(true);
    setUrl("");

    if (isValidUrl(url.trim())) {
      setIframeUrl(url); // Open the URL in the iframe
      setStartTime(Date.now()); // Start tracking time
      setIsError(false);
    } else {
      setIsError(true); // Show error for invalid URL
    }
  };

  return (
    <>
      {showFrameWindow ? (
        <div className={styles.iframeDiv}>
          <div className={styles.cancleBtn}>
            <div
              className={styles.cross}
              onClick={handleShowFrameFunction}
            ></div>
          </div>
          {isError ? (
            <div className={styles.errorMessage}>
              <p className={styles.errorPara}>
                Failed to <span className={styles.center}>load</span>. Check the
                URL and <span className={styles.center}>try again</span>.
              </p>
            </div>
          ) : (
            <iframe
              ref={iFrame}
              title="Site Monitor"
              src={iframeUrl}
              className={styles.iFrameBox}
            ></iframe>
          )}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Navbar link1={navLinks[0]} link2={navLinks[1]}></Navbar>

          <div className={styles.main}>
            <div className={styles.title}>
              <p className={styles.titlePara}>
                Search <span className={styles.center}>Website</span>
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.blur}></div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                className={styles.fromInput}
                required
              />
              <div className={styles.buttonDiv}>
                <button type="submit" className={styles.formBtn}>
                  Submit
                </button>
                <span></span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Frame;
