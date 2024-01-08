import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";

const container = document.querySelector("div[data-bind], #root");
if (!container) {
  throw new Error("Root element not found");
}
const root = createRoot(container!);
let translations = JSON.parse(container.getAttribute("data-bind") || "{}");

translations = Object.keys(translations).reduce((res, id) => {
  const { title: heading, ...rest } = translations[id];

  if (!heading) return res;

  return {
    ...res,
    [id]: {
      heading,
      ...rest,
    },
  };
}, {});

root.render(<App translations={translations} />); /* eslint no-undef: 0 */
