import { THEME } from "@/styles/config";
import "@/styles/globals.scss";
import { ConfigProvider } from "antd";
import { Locale } from "antd/es/locale";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import enUS from "antd/locale/en_US";
import frCA from "antd/locale/fr_CA";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ConfigProvider theme={THEME} locale={router.locale === "en" ? enUS : frCA}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default appWithTranslation(App);
