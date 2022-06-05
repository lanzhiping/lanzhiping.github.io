import styles from "./serverless.module.scss";

const Serverless = () => {
  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.image}
          alt="Zhiping has serverless architect experience"
          src="/imgs/serverless.svg"
          width="300vw"
          height="100vh"
        />
      </div>
      <div className={styles.description}>
        serverless architecture experience
      </div>
    </div>
  );
};

export default Serverless;
