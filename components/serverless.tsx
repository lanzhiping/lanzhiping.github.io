import classnames from "classnames";
import styles from "./serverless.module.scss";
import { useScrollContext } from "../context/scrollContext";

const Serverless = () => {
  const { percentage } = useScrollContext(3);

  const containerClasses = classnames({
    [styles.container]: true,
    [styles.containerFixed]: percentage >= 0.5 && percentage < 1,
    [styles.containerSticked]: percentage === 1,
  });

  const imageHeight = percentage < 0.6 ? 100 : Math.min(percentage, 0.9) * 1500;
  const imageTop = percentage < 0.2 ? 0 : Math.min(percentage, 0.75) * 35;

  const descClasses = classnames({
    [styles.description]: true,
    [styles.descriptionFade]: percentage > 0.6,
  });

  return (
    <div className={containerClasses}>
      <div>
        <img
          className={styles.image}
          style={{
            height: `${imageHeight}vh`,
            transform: `translate(-50%, -${imageTop}%)`,
          }}
          alt="Zhiping has serverless architect experience"
          src="/imgs/serverless.svg"
          width="300vw"
          height="100vh"
        />
      </div>
      <div className={descClasses}>serverless architecture experience</div>
    </div>
  );
};

export default Serverless;
