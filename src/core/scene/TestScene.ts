import * as PIXI from "pixi.js";
import Scene from "./Scene";

export default class TestScene extends Scene {
	async onLoad() {
		/* 		const gow = PIXI.Sprite.from("gow copy 2");
		this.addChild(gow);

		const shockWaveFilter = new filters.ShockwaveFilter([this.width / 2, this.height / 2], {
			repeat: true,
		});
		this.filters = [shockWaveFilter];

		console.log(PIXI.Assets.resolver); */
		// console.log(PIXI.Assets.loader);
		// const logo = PIXI.Texture.from("gow");
		// 	bunny.x = window.innerWidth / 2;
		// 	bunny.y = window.innerHeight / 2;
		// 	bunny.scale.set(2);
		// 	bunny.anchor.set(0.5);
		// 	const filterCenter = [this.width, this.height];
		// 	// this.test = await PIXI.Assets.loader.load(https://pixijs.com/assets/bunny.png);
		// 	// this.addChild(testSprite);
		// 	const shockwaveFilter = new filters.ShockwaveFilter(filterCenter, { radius: this.width, speed: 2 });
		// 	// shockwaveFilter.center = [1, 1];
		// 	this.filters = [shockwaveFilter];
		// 	this.parent.addChild(this);
		// 	this.addChild(bunny);
	}
}
