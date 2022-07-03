import classnames from "classnames";
import styles from "./intro.module.scss";
import { useScrollContext } from "../context/scrollContext";

const Introduction = () => {
  const { percentage } = useScrollContext(1);

  const containerClasses = classnames({
    [styles.container]: true,
    [styles.containerFixed]: percentage >= 0.5 && percentage < 1,
    [styles.containerSticked]: percentage === 1,
    [styles.containerBg1]: percentage > 0.6 && percentage <= 0.75,
    [styles.containerBg2]: percentage > 0.75 && percentage <= 0.9,
  });

  const introClasses1 = classnames({
    [styles.intro]: true,
    [styles.introLeft]: percentage > 0.62 && percentage < 0.92,
  });

  const introClasses2 = classnames({
    [styles.intro]: true,
    [styles.introRight]: percentage > 0.62 && percentage < 0.92,
  });

  return (
    <div className={containerClasses}>
      <div className={introClasses1}>
        <span>Software Enginner</span>
        <span>Software Enginner</span>
        <span>Software Enginner</span>
      </div>
      <div className={introClasses2}>
        <span>Full Stack</span>
        <span>Full Stack</span>
        <span>Full Stack</span>
        <span>Full Stack</span>
      </div>
      <div className={introClasses1}>
        <span>Architecture Design</span>
        <span>Architecture Design</span>
        <span>Architecture Design</span>
      </div>
    </div>
  );
};

export default Introduction;
