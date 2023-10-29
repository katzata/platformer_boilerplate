import * as PIXI from "pixi.js";
import Stage from "./Stage";

export const appDefaults = {
	background: "#000000",
	backgroundAlpha: 1,
	clearBeforeRender: false,
	premultipliedAlpha: false,
	preserveDrawingBuffer: false,
	antialias: false,
	resizeTo: window,
	autoDensity: true,
	powerPreference: "high-performance",
	backgroundColor: 0xa0a0a0,
} as unknown as PIXI.IApplicationOptions;

export default class Application extends PIXI.Application {
	constructor(options?: PIXI.IApplicationOptions) {
		super(options || appDefaults);

		this.stage = new Stage();

		document.body.appendChild(this.view as HTMLCanvasElement);

		globalThis.__PIXI_APP__ = this;
	}
}
