// import * as PIXI from "pixi.js";
import assets from "./assets/assetsManifest.json";
import { components } from "../core/core";
import Stage from "./Stage";

export default class App extends components.Application {
	constructor() {
		super();

		this.stage = new Stage({ assets });
	}
}
