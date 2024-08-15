import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
  headless: !true,
  args: ["--start-maximized"],
}
export const invokeBrowser = () => {
  const browserType = process.env.npm_config_browser || "chrome"; //if no browser provided run on default browser chrome
  switch (browserType) {
    case "chrome":
      return chromium.launch(options);
    case "firefox":
      return firefox.launch(options);
    case "webkit":
      return webkit.launch(options);
    case "edge":
      return chromium.launch({ channel: 'msedge', headless: !true })
    case "all":
      return chromium.launch(options), chromium.launch({ channel: 'msedge', headless: !true });
    default:
      throw new Error("Set the browser");
  }
}