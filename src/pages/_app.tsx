import { THEME } from "@/styles/config";
import "@/styles/globals.scss";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={THEME}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
