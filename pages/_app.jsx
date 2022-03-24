import React, {useEffect} from "react";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import {wrapper} from "~/store/store";
import "~/styles/style.scss";
import "antd/dist/antd.min.css";
import {useRouter} from "next/router";
import CrossOriginLogin from "~/components/shared/CrossOriginLogin";
import Head from "next/head";
function App({Component, pageProps}) {
  const router = useRouter();
  const pathName = router.pathname;

  const getLayout =
    Component.getLayout ||
    ((page) => <DefaultLayout children={page} pathName={pathName} />);
  useEffect(() => {
    setTimeout(function () {
      document.getElementById("__next").classList.add("loaded");
    }, 100);
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <meta name="author" content="nouthemes" />
        <meta
          name="keywords"
          content="dDue Dilly, react, ecommerce, Template"
        />
        <meta name="description" content=" Due Dilly - Vendor" />
        <title>Due Dilly | Admin Dashboard</title>
      </Head>
      <>
        {getLayout(<Component {...pageProps} />)}
        <CrossOriginLogin />
      </>
    </>
  );
}

export default wrapper.withRedux(App);
