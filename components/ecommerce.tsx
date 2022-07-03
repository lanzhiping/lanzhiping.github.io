/* eslint-disable @next/next/no-img-element */

import classnames from "classnames";
import styles from "./ecommerce.module.scss";
import { useScrollContext } from "../context/scrollContext";

const ECommerceWeb = () => {
  const { percentage } = useScrollContext(2);

  const containerClasses = classnames({
    [styles.container]: true,
    [styles.containerFixed]: percentage >= 0.5 && percentage < 1,
    [styles.containerSticked]: percentage === 1,
  });

  const imageHeight =
    percentage < 0.25 ? 300 : (1 - Math.min(percentage, 0.75)) * 300;

  const descTop =
    percentage < 0.25 ? 60 : (1 - Math.min(percentage, 0.75)) * 80;

  const descClasses = classnames({
    [styles.description]: true,
    [styles.descriptionContrast]: percentage >= 0.8,
  });

  return (
    <div className={containerClasses}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          style={{ height: `${imageHeight}vh` }}
          alt="Zhiping has ecommerce website development experience"
          src="/imgs/ecommerce.svg"
          width="300vw"
          height="100vh"
        />
      </div>
      <div className={descClasses} style={{ top: `${descTop}%` }}>
        website development experiences
      </div>
    </div>
  );
};

export default ECommerceWeb;
