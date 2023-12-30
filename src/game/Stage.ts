import { components } from "../core/core";
// import * as stageTypes from "../core/scene/Stage";
import TestScene from "./scenes/TestScene";

export default class Stage extends components.Stage {
	scenes = {
		test: TestScene,
	};
	// constructor(scenes?: stageTypes.StageScene | null | undefined, options?: stageTypes.SceneOptions | undefined) {
	// 	super(scenes, options);
	// }

	ready(assets) {
		const newTestScene = new TestScene(this, "test", assets["test"]);
	}
}
