import Head from "next/head";
import Script from "next/script";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Zhiping Lan</title>
        <meta
          name="viewport"
          content="initial-scale = 1.0,maximum-scale = 1.0"
        />
        <meta
          name="description"
          content="This is Zhiping Lan introduction website. Hosted from Github."
        />
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
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
