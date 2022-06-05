/* eslint-disable @next/next/no-img-element */

import styles from "./ecommerce.module.scss";

const ECommerceWeb = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt="Zhiping has ecommerce website development experience"
          src="/imgs/ecommerce.svg"
          width="300vw"
          height="100vh"
        />
      </div>
      <div className={styles.description}>website development experiences</div>
    </div>
  );
};

export default ECommerceWeb;
