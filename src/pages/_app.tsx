import { THEME } from "@/styles/config";
import "@/styles/globals.scss";
import { ConfigProvider } from "antd";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={THEME}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default appWithTranslation(App);
