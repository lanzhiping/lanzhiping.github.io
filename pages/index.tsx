import Links from "../components/links";
import Introduction from "../components/intro";
import EcommerceWeb from "../components/ecommerce";
import Serverless from "../components/serverless";
import Frameworks from "../components/frameworks";
import styles from "./index.module.scss";

const Index = () => (
  <div className={styles.container}>
    <div className={styles.section1}>
      <Links />
      <Introduction />
    </div>
    <div className={styles.section2}>
      <EcommerceWeb />
    </div>
    <div className={styles.section3}>
      <Serverless />
    </div>
    <div className={styles.section4}>
      <Frameworks />
    </div>
  </div>
);

export default Index;
