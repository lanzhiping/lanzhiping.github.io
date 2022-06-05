import styles from "./frameworks.module.scss";
import Image from "next/image";

const data = {
  reactjs: {
    name: "ReactJS",
    type: "frontend",
    avatar: "https://avatars.githubusercontent.com/reactjs?s=200",
  },
  angularjs: {
    name: "AngularJS",
    type: "frontend",
    avatar: "https://avatars.githubusercontent.com/angular?s=200",
  },
  backbonejs: {
    name: "BackboneJS",
    type: "frontend",
    avatar: "/imgs/backbonejs.png",
  },
  sass: {
    name: "Sass",
    type: "frontend",
    avatar: "https://avatars.githubusercontent.com/sass?s=200",
  },
  styledcomponents: {
    name: "Styled Components",
    type: "frontend",
    avatar: "https://avatars.githubusercontent.com/u/20658825?s=200&v=4",
  },
  webpack: {
    name: "WebpackJS",
    type: "frontend",
    avatar: "https://avatars.githubusercontent.com/webpack?s=200",
  },
  nodejs: {
    name: "NodeJS",
    type: "backend",
    avatar: "https://nodejs.org/static/images/logos/js-green.svg",
  },
  typescirpt: {
    name: "TypeScript",
    type: "backend",
    avatar:
      "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/typescript/typescript.png",
  },
  mysql: {
    name: "MySQL",
    type: "backend",
    avatar: "https://labs.mysql.com/common/logos/mysql-logo.svg",
  },
  graphql: {
    name: "GraphQL",
    type: "backend",
    avatar: "https://avatars.githubusercontent.com/u/12972006?s=200",
  },
  aws: {
    name: "AWS",
    type: "ops",
    avatar: "https://avatars.githubusercontent.com/u/2232217?s=200",
  },
  jenkins: {
    name: "Jenkins",
    type: "ops",
    avatar:
      "https://raw.githubusercontent.com/jenkinsci/jenkins/master/.idea/icon.svg",
  },
};

const Framework = ({
  avatar,
  name,
  className,
  layout,
}: {
  avatar: string;
  name: string;
  className?: string;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | "raw";
}) => (
  <div className={`${styles.imageContainer} ${className}`}>
    {layout ? (
      <Image src={avatar} alt={name} layout={layout} />
    ) : (
      <Image src={avatar} alt={name} width={100} height={100} />
    )}
  </div>
);

const Frameworks = () => {
  return (
    <div>
      {Object.values(data).map((framework) => (
        <Framework {...framework} key={framework.name} />
      ))}
    </div>
  );
};

export default Frameworks;
