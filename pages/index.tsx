import { ScrollContextProvider } from "../context/scrollContext";
import Links from "../components/links";
import Introduction from "../components/intro";
import Serverless from "../components/serverless";
import Frameworks from "../components/frameworks";
import EcommerceWeb from "../components/ecommerce";
import styles from "./index.module.scss";

const Index = () => (
  <ScrollContextProvider>
    <div className={styles.container}>
      <Links />
      <div className={styles.section1}>
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
  </ScrollContextProvider>
);

export default Index;
