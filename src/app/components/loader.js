import styles from "./loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
        <img src="/images/loader.gif" alt="loader" />
    </div>
  )
}

export default Loader