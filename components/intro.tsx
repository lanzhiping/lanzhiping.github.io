import styles from "./intro.module.scss";

const Introduction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <span>Software Enginner</span>
        <span>Software Enginner</span>
        <span>Software Enginner</span>
      </div>
      <div className={styles.intro}>
        <span>Full Stack</span>
        <span>Full Stack</span>
        <span>Full Stack</span>
        <span>Full Stack</span>
      </div>
      <div className={styles.intro}>
        <span>Architecture Design</span>
        <span>Architecture Design</span>
        <span>Architecture Design</span>
      </div>
    </div>
  );
};

export default Introduction;
