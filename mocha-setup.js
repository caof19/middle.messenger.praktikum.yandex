import { JSDOM } from "jsdom";

const jsdom = new JSDOM("<body></body>", { url: "https://localhost:8080" });

global.window = jsdom.window
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
