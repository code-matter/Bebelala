import { message, Popconfirm, Tooltip } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { TFunction } from "i18next";

export const Feedback = {
  Async: class AsyncFeedback {
    translate: any;
    key: number;
    messageAPI: MessageInstance;
    constructor(
      t: TFunction<"translation", undefined, "translation">,
      messageAPI?: MessageInstance,
      loadingText = t("feedback.waiting")
    ) {
      if (!messageAPI) throw new Error("Message API is not defined");

      this.key = Date.now();
      this.messageAPI = messageAPI;
      this.messageAPI.open({
        type: "loading",
        content: loadingText,
        key: this.key
      });
      this.translate = t;
    }

    success(text = this.translate("feedback.success")) {
      this.messageAPI.open({
        type: "success",
        content: text,
        key: this.key
      });
    }

    error(text = this.translate("feedback.error")) {
      this.messageAPI.open({
        type: "error",
        content: text,
        key: this.key
      });
    }
  },
  Info: (text: string) => {
    if (!text) return;
    message.info(text);
  },
  Warn: (text: string) => {
    if (!text) return;
    message.warning(text);
  },
  Error: (
    t: TFunction<"translation", undefined, "translation">,
    type?: string | null,
    e?: Error | null
  ) => {
    if (e) console.error(e);

    switch (type) {
      case "login-failed":
        message.error(t("feedback.error_login_failed"));
        break;
      case "loading-page":
        message.error(t("feedback.error_loading_page"));
        break;
      case "loading-selects":
        message.error(t("feedback.error_loading_selects"));
        break;
      case "not-found":
        message.error(t("feedback.error_not_found"));
        break;
      default:
        message.error(t("feedback.error"));
        break;
    }
  }
};

/**
 * Delete Button Wrap.
 * @param  { String }   do  Can.do
 * @param  { String }   on  Can.on
 * @param  { Boolean }  deletable   Item is ready to be deleted
 * @param  { String }   confirm     Confirmation message
 * @param  { String }   ok          Ok message
 * @param  { String }   abort       Abort message
 * @param  { String }   tootlip     Tooltip message (if not deletable)
 */
export const DeleteButtonWrap = (props: any) => (
  <>
    {/* <Can do={props.do} on={props.on}> */}
    {props.deletable ? (
      <Popconfirm
        placement="bottomLeft"
        title={props.confirm}
        okText={props.ok}
        okButtonProps={{ className: "red" }}
        cancelText={props.cancel}
        onConfirm={props.action}
      >
        {props.children}
      </Popconfirm>
    ) : (
      <Tooltip placement="bottom" title={props.tooltip || ""}>
        {props.children}
      </Tooltip>
    )}
    {/* </Can> */}
  </>
);

/**
 * A set of rules for the form.
 */

type RulesDict = {
  [key: string]: any;
};

const RULES: RulesDict = {
  required: {
    required: true,
    message: "validation.required"
  },
  email: { type: "email", message: "validation.email" },
  password: {
    pattern: /^(?=.*[A-Za-z@$!%*#?&])(?=.*\d)[A-Za-z@$!%*#?&\d-]{8,}$/,
    message: "validation.password"
  },
  checkbox: {
    required: true,
    message: "validation.required",
    validator: (_: any, checked: boolean) => {
      if (!checked) {
        return Promise.reject(new Error());
      } else {
        return Promise.resolve();
      }
    }
  },
  confirm_password: ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The passwords don't match"));
    }
  }),
  latlng: {
    pattern: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,8})$/,
    message: "validation.latlng"
  },
  url: {
    pattern:
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
    message: "validation.url"
  },
  phone: {
    pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
    message: "validation.phone"
  },
  hex: {
    pattern: /^#([a-zA-Z0-9]{3,6})$/,
    message: "validation.hex"
  },
  postal_code: {
    pattern:
      /^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[- ]{0,1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}$/,
    message: "validation.postal_code"
  },
  ip: {
    pattern:
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    message: "validation.ip"
  }
};

export const rules = (
  key: string,
  t?: TFunction<"translation", undefined, "translation">
) => {
  // const ruleList: TRuleList = {}
  const translatedMessage =
    RULES[key].message && t ? t(RULES[key].message) : null;
  return { ...RULES[key], message: translatedMessage };
};
