const colors = {
  grey: [
    "#fbfafc",
    "#f8f7f9",
    "#f5f3f7",
    "#f1eff4",
    "#eeebf1",
    "#eae7ee",
    "#eae7ee",
    "#c3c1c6",
    "#9c9a9f",
    "#757477",
    "#4e4d4f",
    "#2f2e30"
  ],
  main: [
    "#d3d9dc",
    "#b6c0c4",
    "#91a0a7",
    "#6c8089",
    "#48616c",
    "#23414e",
    "#23414e",
    "#1d3641",
    "#172b34",
    "#122127",
    "#0c161a",
    "#070d10"
  ],
  secondary: [
    "#cceef4",
    "#aae2ec",
    "#80d4e3",
    "#55c6d9",
    "#2bb7d0",
    "#00a9c6",
    "#00a9c6",
    "#008da5",
    "#007184",
    "#005563",
    "#003842",
    "#002228"
  ],
  accent1: [
    "#ecfcf2",
    "#dff9ea",
    "#d0f7e0",
    "#c0f4d5",
    "#b0f1cb",
    "#a0eec0",
    "#a0eec0",
    "#85c6a0",
    "#6b9f80",
    "#507760",
    "#354f40",
    "#203026"
  ],
  accent2: [
    "#fee4dd",
    "#fed3c7",
    "#febdab",
    "#fda68f",
    "#fd9073",
    "#fc7a57",
    "#fc7a57",
    "#d26649",
    "#a8513a",
    "#7e3d2c",
    "#54291d",
    "#321811"
  ]
};

export const THEME = {
  hashed: false,

  token: {
    colorPrimary: "#FF5791",
    controlHeight: 30,
    fontFamily: "Avenir, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    lineWidth: 0.5,
    fontWeightStrong: 700,
    colorTextHeading: "#000000"
  },

  components: {
    Checkbox: {},
    DatePicker: {},
    Button: {
      borderRadius: 4,
      colorText: "#000000",
      colorBgContainer: "#FF579155",
      colorBorder: colors.grey[1],
      lineWidth: 0
    },
    Input: {
      controlOutline: "#FFCADC44",
      controlOutlineWidth: 0,
      colorText: "#FF5791",
      colorBgContainer: "#FFCADC44",
      colorBorder: "#FF5791",
      borderRadius: 4
    }
  }
};
