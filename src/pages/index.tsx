import useWaitForHydration from "@/hooks/useWaitForHydration";
import {
  Button,
  Calendar,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  message
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IncomingMessage } from "http";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { useTranslation } from "next-i18next";
import enUS from "antd/locale/en_US";
import frCA from "antd/locale/fr_CA";
import { Locale } from "antd/lib/locale";
import { AdditionalPickerLocaleLangProps } from "antd/lib/date-picker/generatePicker";
import emailjs from "@emailjs/browser";
import { Feedback, rules } from "@/utils/forms";

export default function Home() {
  const { t } = useTranslation();
  const [dates, setDates] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState<Dayjs>();
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [checkPrice, setCheckPrice] = useState<boolean>(false);
  const [checkAcknowledge, setCheckAcknowledge] = useState<boolean>(false);
  const [check18, setCheck18] = useState<boolean>(false);
  const [checkAgreed, setCheckAgreed] = useState<boolean>(false);

  const handleDateSelect = (date: Dayjs) => {
    if (!date) return;
    setCurrentDate(date);
    const datesTmp = [...dates];
    if (
      datesTmp.find(
        (d: Dayjs) => d.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
      )
    ) {
      const index = datesTmp.findIndex(
        (d: Dayjs) => d.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
      );
      datesTmp.splice(index, 1);
      setDates(datesTmp);
      return;
    }
    setDates([...datesTmp, date]);
  };

  const handleSubmit = (value: any) => {
    const feedback = new Feedback.Async(t, messageApi);
    try {
      emailjs
        .send(
          "service_u39cfkb",
          "template_bebelala",
          {
            ...value,
            date: dates
              .map((date: Dayjs) => date.format("DD-MMM-YYYY"))
              .join(" || "),
            price: value.price ? "✔️" : "❌",
            acknowledge: value.acknowledge ? "✔️" : "❌",
            "18+": value["18+"] ? "✔️" : "❌",
            agreed: value.agreed ? "✔️" : "❌"
          },
          "user_n5uFN8l3KYoh5i8GMiaKF"
        )
        .then(
          () => {
            feedback.success();
          },
          () => {
            feedback.error();
          }
        );
    } catch (error) {
      console.log(error);
    } finally {
      form.resetFields();
      setDates([]);
      setCheckPrice(false);
      setCheckAcknowledge(false);
      setCheck18(false);
      setCheckAgreed(false);
    }
  };

  const [isHydrated, loader] = useWaitForHydration();

  if (!isHydrated) return loader;
  return (
    <>
      <Head>
        <title>Bébélala Guest Sheet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        {contextHolder}
        <div className="logo">
          <span>
            <h1>Guest</h1>
            <Image src="/logo.svg" width={335} height={200} alt="logo" />
            <h1>Sheet</h1>
          </span>
          <Link href="/" locale={router.locale === "en" ? "fr" : "en"}>
            {router.locale === "en" ? "fr" : "en"}
          </Link>
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          id="form123"
        >
          <section>
            <div className="flow">
              <Form.Item
                name="lastName"
                label={t("form.lastName")}
                rules={[rules("required", t)]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstName"
                label={t("form.firstName")}
                rules={[rules("required", t)]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="flow">
              <Form.Item
                name="pronouns"
                label={t("form.pronouns")}
                rules={[rules("required", t)]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label={t("form.email")}
                rules={[rules("required", t)]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="flow">
              <Form.Item
                name="phone"
                label={t("form.phone")}
                rules={[rules("required", t)]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="social"
                label={t("form.social")}
                rules={[rules("required", t)]}
              >
                <Input prefix="@" />
              </Form.Item>
            </div>
          </section>
          <section>
            <Form.Item name="date" label={t("form.date")}>
              <Calendar
                value={currentDate}
                fullscreen={false}
                onPanelChange={(e) => setCurrentDate(undefined)}
                onSelect={(date) => handleDateSelect(date)}
                dateFullCellRender={(date: Dayjs) => (
                  <div
                    className={`date-container ${
                      dates.find(
                        (d: Dayjs) =>
                          d.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
                      )
                        ? "selected"
                        : ""
                    }`}
                  >
                    <span>{date.get("date")}</span>
                  </div>
                )}
              />
            </Form.Item>

            <div className="flow-column">
              <Form.Item name="gloves" label={t("form.gloves")}>
                <Select
                  options={[
                    { label: "XS", value: "XS" },
                    { label: "S", value: "S" },
                    { label: "M", value: "M" },
                    { label: "L", value: "L" },
                    { label: "XL", value: "XL" }
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="scott_towel"
                label={t("form.scott_towel")}
                rules={[rules("required", t)]}
              >
                <Select
                  options={[
                    { label: t("form.blue_scott"), value: "Bleu" },
                    { label: t("form.regular_scott"), value: "Régulier" },
                    {
                      label: t("form.no_preferences"),
                      value: "Aucune préférence"
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="price"
                label={t("form.price")}
                rules={[rules("checkbox", t)]}
                valuePropName="checked"
              >
                <div>
                  <h3>{t("form.price_text")}</h3>
                  <Checkbox
                    onChange={() => setCheckPrice(!checkPrice)}
                    checked={checkPrice}
                  >
                    {t("form.read_accept")}
                  </Checkbox>
                </div>
              </Form.Item>
            </div>
          </section>
          <section>
            <div className="flow">
              <div className="flow-column">
                <Form.Item
                  name="current_tattoo_location"
                  label={t("form.current_tattoo_location")}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="hear_from_us" label={t("form.hear_from_us")}>
                  <Input />
                </Form.Item>
              </div>
              <Form.Item name="extra" label={t("form.extra")}>
                <Input.TextArea autoSize={{ minRows: 4.8 }} />
              </Form.Item>
            </div>
            <Form.Item
              label={<></>}
              valuePropName="checked"
              name="acknowledge"
              rules={[rules("checkbox", t)]}
            >
              <Checkbox
                onChange={() => setCheckAcknowledge(!checkAcknowledge)}
                checked={checkAcknowledge}
              >
                {t("form.acknowledge")}
              </Checkbox>
            </Form.Item>
            <Form.Item
              label={<></>}
              valuePropName="checked"
              name="18+"
              rules={[rules("checkbox", t)]}
            >
              <Checkbox onChange={() => setCheck18(!check18)} checked={check18}>
                {t("form.18+")}
              </Checkbox>
            </Form.Item>
            <Form.Item
              label={<></>}
              valuePropName="checked"
              name="agreed"
              rules={[rules("checkbox", t)]}
            >
              <Checkbox
                onChange={() => setCheckAgreed(!checkAgreed)}
                checked={checkAgreed}
              >
                {t("form.agreed")}
              </Checkbox>
            </Form.Item>
          </section>
          <Button htmlType="submit">{t("form.submit")}</Button>
        </Form>
      </main>
    </>
  );
}

interface ServerSideProps extends IncomingMessage {
  locale: string;
  query?: NextApiRequestQuery;
}

export async function getStaticProps({ locale }: ServerSideProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  };
}
