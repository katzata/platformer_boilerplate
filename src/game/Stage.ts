import { components } from "../core/core";
import TestScene from "./scenes/TestScene";

export default class Stage extends components.Stage {
	constructor() {
		super();
	}

	onLoad(assets) {
		const newTestScene = new TestScene("test", { assetPaths: assets["test"] });

		this.addChild(newTestScene);
	}
}
