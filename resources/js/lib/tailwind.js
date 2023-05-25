import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfigFile from "../../../tailwind.config.js";

const tailwindConfig = resolveConfig(tailwindConfigFile);

export function isLargerThan(breakpoint) {
  if (typeof window === "undefined") return false;

  const breakpointValue = Number.parseInt(
    // @ts-ignore
    tailwindConfig.theme?.screens[breakpoint].replace("px", "")
  );

  return window.innerWidth > breakpointValue;
}
