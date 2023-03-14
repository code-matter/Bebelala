import useWaitForHydration from "@/hooks/useWaitForHydration";
import { Button, Calendar, DatePicker, Form, Input } from "antd";
import { Dayjs } from "dayjs";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [dates, setDates] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState<Dayjs>();
  const [form] = Form.useForm();
  console.log("dates", dates);
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
    console.log({ ...value, date: dates });
  };

  const [isHydrated, loader] = useWaitForHydration();
  if (!isHydrated) return loader;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="pronouns" label="Pronouns">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Cellphone">
            <Input />
          </Form.Item>
          <Form.Item name="social" label="Instagram Handle">
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date">
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
          <Button htmlType="submit">Submit</Button>
        </Form>
      </main>
    </>
  );
}
