import * as PIXI from "pixi.js";
import TestScene from "../game/scenes/TestScene";

export default class Stage extends PIXI.Container {
	sceneContainer = new PIXI.Container();

	constructor() {
		super();

		const scene = new TestScene(this, "test");
	}
}
