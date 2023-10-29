import * as PIXI from "pixi.js";
import { components } from "../../core/core";

export default class TestScene extends components.Scene {
	onLoad(): void {
		const bunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");

		bunny.x = window.innerWidth / 2;
		bunny.y = window.innerHeight / 2;
		bunny.scale.set(2);
		bunny.anchor.set(0.5);

		this.addChild(bunny);
		this.parent.addChild(this);
	}
}
