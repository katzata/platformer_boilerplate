import * as PIXI from "pixi.js";

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

declare global {
	interface Window {
		app: PIXI.Application;
	}
}

export default class Application extends PIXI.Application {
	constructor(options?: PIXI.IApplicationOptions) {
		super(options || appDefaults);

		document.body.appendChild(this.view as HTMLCanvasElement);

		window.app = this;
		globalThis.__PIXI_APP__ = this;
	}
}
