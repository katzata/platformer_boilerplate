import * as PIXI from "pixi.js";
import TestScene from "./TestScene";

export namespace stageTypes {
	export interface StageScene {
		// Set an order or even repeat
		// If omitted will follow the array order
		assets?: Record<string, string[]>;
	}

	export interface SceneOptions {
		// Set an order or even repeat
		// If omitted will follow the array order
		order?: string[];
	}
}

export default class Stage extends PIXI.Container {
	scenes: Record<string, Function> = {};
	assetManager: PIXI.AssetsClass;

	constructor(scenes?: stageTypes.StageScene | null, options?: stageTypes.SceneOptions) {
		super();

		if (!scenes) {
			new TestScene(this, "test");
			return;
		}

		this.init(scenes.assets);
	}

	async init(assets) {
		const sceneName = "test";
		console.log(assets);

		// const scene = new Scene(this, sceneName, assets[sceneName]);
		// console.log(scene.name);

		// await new Promise((res) => {

		// 	res(null);
		// });

		// console.log(this);
		this.ready(assets);
	}

	ready(assets: Record<string, string>) {}
}
