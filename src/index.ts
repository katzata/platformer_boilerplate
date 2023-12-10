// import Application from "./core/App";
import App from "./game/App";

const app = new App();

// @ts-ignore
globalThis.__PIXI_APP__ = app;
