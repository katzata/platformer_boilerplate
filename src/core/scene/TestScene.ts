import * as PIXI from "pixi.js";
import Scene from "./Scene";
import Char from "./chars/Char";

export default class TestScene extends Scene {
	circle: PIXI.Sprite;
	char: Char;

	constructor(name) {
		super(name);
	}

	async onLoad() {
		this.char = new Char("circle");
	}
}
