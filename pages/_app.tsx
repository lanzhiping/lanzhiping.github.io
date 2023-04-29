import Head from "next/head";
import Script from "next/script";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale = 1.0,maximum-scale = 1.0"
        />
        <title>Zhiping&apos;s Github page</title>
        <meta
          name="description"
          content="This is Zhiping Lan introduction website. Hosted from Github."
        />
        <meta property="og:url" content="https://lanzhiping.github.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zhiping&apos;s Github page" />
        <meta property="og:description" content="This is Zhiping Lan introduction website. Hosted from Github." />
        <meta property="og:image" content="https://github.githubassets.com/images/modules/open_graph/github-logo.png" />
      </Head>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-133566840-1', 'auto');
            ga('send', 'pageview');`,
        }}
      />
      <Script
        id="anaytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){fetch('https://zhiping-analytics.onrender.com/trackView',{method: "GET",mode: "cors"}).then(()=>{}).catch(()=>{});})();`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
