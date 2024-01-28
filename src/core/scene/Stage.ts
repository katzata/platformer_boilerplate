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
	scenes: string[];
	assetManager: PIXI.AssetsClass;

	constructor() {
		super();

		this.scenes = ["test"];

		this.init();
	}

	async init() {
		const sceneAssets = await fetch("./assets/assetsManifest.json").then((res) => res.json());

		if (!this.scenes) {
			const newTestScene = new TestScene("test");
			this.addChild(newTestScene);
			return;
		}

		this.onLoad(sceneAssets);
	}

	onLoad(assets: Record<string, string>) {}
}
