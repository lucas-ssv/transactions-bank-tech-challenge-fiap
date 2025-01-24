import { Config } from "tailwindcss";

const config: Config = {
  prefix: "remote-app-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./dist/*.html"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "my-dark-green": "#004D61",
        "my-light-green": "#E4EDE3",
        "my-green": "#47A138",
        "my-red": "#FF5031",
        "my-dark-red": "#BF1313",
        "my-blue": "#004D61",
        "my-gray": "#767676",
        "my-gray-box": "#CBCBCB",
        "my-light-gray": "#F8F8F8",
        "my-orange": "#FF5031",
        "my-services-gray": "#CBCBCB",
        "my-services-card-bg": "#F2F2F2",
        "my-input-border": "#DEE9EA",
        "my-extract-date-color": "#8B8B8B",
      },
      container: {
        screens: {
          sm: "360px",
          md: "720px",
          lg: "1200px",
        },
      },
    },
    screens: {
      sm: "360px",
      md: "720px",
      lg: "1200px",
      xl: "1920px",
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
