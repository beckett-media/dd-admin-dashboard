import React, { useEffect } from "react";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import { wrapper } from "~/store/store";
import "~/styles/style.scss";
import "antd/dist/antd.min.css";
import { useRouter } from "next/router";
import CrossOriginLogin from "~/components/shared/CrossOriginLogin";

function App({ Component, pageProps }) {
  const router = useRouter();
  const pathName = router.pathname;

  const getLayout = Component.getLayout || ((page) => <DefaultLayout children={page} pathName={pathName} />);
  useEffect(() => {
    setTimeout(function () {
      document.getElementById("__next").classList.add("loaded");
    }, 100);
  }, []);

  return (
    <>
      {getLayout(<Component {...pageProps} />)}   
      <CrossOriginLogin/> 
    </>
  );
}

export default wrapper.withRedux(App);
