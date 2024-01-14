import { components, filters, effects, controls, utils, emitter, types, PIXI } from "../../core/core";

export default class TestScene extends components.Scene {
	circle: PIXI.Sprite;
	char: types.Char;
	char2: types.Char;
	// async init() {
	// 	this.test = await PIXI.Assets.loader.load("./assets/scenes/test/rof.png");
	// }

	constructor(name: string, options?: types.SceneOptions) {
		super(name, options);

		window.onmousemove = (e) => {
			// const toRotate = [this.circle, this.circle2, this.circle3];
			// const rotations = utils.getRotation(
			// 	toRotate.map((el) => ({ x: el.worldTransform.tx, y: el.worldTransform.ty })),
			// 	e,addKeyboardScheme
			// );
			// for (let i = 0; i < toRotate.length; i++) {
			// 	toRotate[i].rotation = rotations[i];
			// }
			// this.char.rotate(e);
		};

		/* window.onmousedown = async (e) => {
			const coordSprite = this.renderSprite();

			coordSprite.width = 3;
			coordSprite.height = 3;
			coordSprite.anchor.set(0.5);
			coordSprite.x = e.x;
			coordSprite.y = e.y;

			this.addChild(coordSprite);

			// console.log(1);

			await this.char.move(e);
			// console.log(2);
		}; */
	}

	async onLoad() {
		const rof = PIXI.Sprite.from("rof");
		rof.alpha = 0.3;
		const options = {
			frame: {
				x: 120,
				y: 120,
				width: 368,
				height: 368,
			},
		};
		const rofTexture = await utils.generateTexturePortion("rof", options);

		const container = new PIXI.Container();

		const rofPortion = PIXI.Sprite.from(rofTexture);
		container.x = 120;
		container.y = 120;
		rofPortion.width = 368;
		rofPortion.height = 368;

		const gradient = new effects.GradientGenerator();
		const [testGradient] = gradient.generateGradient({
			// colorStops: ["rgba(2,0,36,1)", "purple", "rgba(9,9,121,1)", "rgba(0,212,255,1)", "red"],
			colorStops: ["black", "white"],
			width: rofPortion.width,
			height: rofPortion.height,
			type: "linear",
			radiuses: [12, 194],
			cropped: false,
			// radiusOffsets: [
			// 	{ x: rofPortion.width / 2, y: 0 },
			// 	{ x: rofPortion.width / 2, y: 0 },
			// ],
		});

		const positionsX = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			// { x: 3, y: 1 },
			{ x: 2, y: 1 },
			// { x: 3, y: 0 },
			{ x: 4, y: 1 },
			{ x: 0, y: 1 },
			{ x: 4, y: 0 },
			{ x: 0, y: 2 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 },
			{ x: 3, y: 2 },
			{ x: 4, y: 2 },
		];
		// const positionsX = [
		// 	{ x: 0, y: 0 },
		// 	{ x: 1, y: 0 },
		// 	{ x: 1, y: 1 },
		// 	// { x: 3, y: 1 },
		// 	{ x: 2, y: 1 },
		// 	// { x: 3, y: 0 },
		// 	{ x: 4, y: 1 },
		// 	{ x: 0, y: 1 },
		// 	{ x: 4, y: 0 },
		// 	{ x: 0, y: 2 },
		// 	{ x: 1, y: 2 },
		// 	{ x: 2, y: 2 },
		// 	{ x: 3, y: 2 },
		// 	{ x: 4, y: 2 },
		// ];

		const positionsX2 = [
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 0, y: 2 },
			{ x: 0, y: 3 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
			{ x: 1, y: 3 },
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
			{ x: 2, y: 3 },
			{ x: 3, y: 0 },
			{ x: 3, y: 1 },
			{ x: 3, y: 2 },
			{ x: 3, y: 3 },
			{ x: 4, y: 0 },
			{ x: 4, y: 1 },
			{ x: 4, y: 2 },
			{ x: 4, y: 3 },
		];

		const positionsY = [
			{ x: 1, y: 0 },
			// { x: 0, y: 1 },
			{ x: 1, y: 1 },
			// { x: 0, y: 2 },
			{ x: 1, y: 3 },
			{ x: 0, y: 0 },
			{ x: 1, y: 2 },
			{ x: 0, y: 3 },
		];

		const whiteSprite = this.renderSprite();
		whiteSprite.width = rofPortion.width / 2;
		whiteSprite.height = rofPortion.height / 2;
		whiteSprite.x = container.x + rofPortion.width / 4;
		whiteSprite.y = container.y;

		this.addChild(rof);
		// this.addChild(whiteSprite);
		this.addChild(container);

		//
		//
		//
		//
		//
		//
		// this.circle = PIXI.Sprite.from("circle");
		// this.circle.anchor.set(0.5);
		// this.circle.x = window.innerWidth / 2;
		// this.circle.y = window.innerHeight / 2;

		// this.addChild(this.circle);

		this.char = new components.Char("circle", {
			bounds: {
				x: {
					min: 200,
					max: window.innerWidth,
				},
				y: {
					min: 800,
					max: window.innerHeight,
				},
				limitToBounds: false,
			},
		});

		this.char.x = window.innerWidth / 2;
		this.char.y = window.innerHeight / 2;

		this.addChild(this.char);

		this.char2 = new components.Char("circle2", {
			bounds: {
				x: {
					min: 400,
					max: window.innerWidth,
				},
				y: {
					min: 800,
					max: window.innerHeight,
				},
				limitToBounds: false,
			},
		});

		this.char2.x = window.innerWidth / 2 + 200;
		this.char2.y = window.innerHeight / 2;

		this.addChild(this.char2);

		//
		//
		//
		//
		//
		//

		// const test = new Test(this);

		// test.activate(positionsX);
		// test.activate(positionsY);

		// container.addChild(rofPortion);
		// container.addChild(testGradient);

		// testGradient.x = rofPortion.width;
		// testGradient.rotation = (90 * Math.PI) / 180;
		// rofPortion.mask = testGradient;
	}

	renderSprite(texture?: PIXI.Texture) {
		return PIXI.Sprite.from(PIXI.Texture.WHITE);
	}
}
