import Image from "next/image";
import styles from "./links.module.scss";

const data = {
  avatar: "https://avatars.githubusercontent.com/u/12001697?s=500",
  email: "lanzhiping6@gmail.com",
  github: "https://github.com/lanzhiping",
  linkedin: "https://www.linkedin.com/in/zhiping-lan-a51117b9/",
};

const About = () => {
  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.avatar}>
          <Image
            alt="Zhiping's avatar"
            src={data.avatar}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.name}>Zhiping</div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.email}>
          <a data-type="email" href={`mailto:${data.email}`}>
            Email
          </a>
        </div>
        <div className={styles.github}>
          <a data-type="github" href={data.github}>
            Github
          </a>
        </div>
        <div className={styles.linkedin}>
          <a data-type="linkedin" href={data.linkedin}>
            Linkedin
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
