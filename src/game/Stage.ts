import { components } from "../core/core";
import TestScene from "./scenes/TestScene";

export default class Stage extends components.Stage {
	scenes = {
		test: TestScene,
	};

	constructor(scenes?: any, options?: any) {
		super(scenes, options);
	}

	ready(assets) {
		const newTestScene = new TestScene("test", { assetPaths: assets["test"] });

		this.addChild(newTestScene);
	}
}
