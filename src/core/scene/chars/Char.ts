import * as PIXI from "pixi.js";
import Entity, { EntityMoveOptions, EntityOptions } from "../core/Entity";
import { controls } from "../../core";

export namespace charTypes {
	export interface IChar extends Char {}

	export interface CharOptions extends EntityOptions {
		controls?: typeof controls;
	}

	export interface CharSpeed {
		walk?: number;
		run?: number;
		jump?: number;
	}
}

export default class Char extends Entity {
	charName: string = "Default char";
	controls = controls;
	lives: 0;
	hp: 0;
	speed: charTypes.CharSpeed = {
		walk: 2,
		run: 4,
		jump: 3,
	};
	currentSpeed: string = "run";
	respawn?: boolean;
	visibilityRange?: number;
	isHostile?: boolean;
	isFriendly?: boolean;

	constructor(name, options: charTypes.CharOptions) {
		super(name, options);

		this.charName = name;

		const test = {
			up: {
				callback: (delta: number) => (this.y -= this.speed[this.currentSpeed] * delta),
			},
			down: {
				callback: (delta: number) => (this.y += this.speed[this.currentSpeed] * delta),
			},
			left: {
				callback: (delta: number) => (this.x -= this.speed[this.currentSpeed] * delta),
			},
			right: {
				callback: (delta: number) => (this.x += this.speed[this.currentSpeed] * delta),
			},
			button1: {
				callback: (delta: number) => {
					console.log(this.charName, " : 1");
				},
			},
			button2: {
				callback: (delta: number) => {
					console.log(this.charName, " : 2");
				},
			},
			button3: {
				callback: (delta: number) => {
					console.log(this.charName, " : 3");
				},
			},
			button4: {
				callback: (delta: number) => {
					console.log(this.charName, " : 4");
				},
			},
			button5: {
				callback: (delta: number) => {
					console.log(this.charName, " : 5");
				},
			},
			button6: {
				callback: (delta: number) => {
					console.log(this.charName, " : 6");
				},
			},
		};

		const test2 = {
			buttons: {
				up: {
					autoFireException: true,
					callback: (delta: number) => {
						this.move("y", -this.speed[this.currentSpeed], delta);
					},
				},
				down: {
					autoFireException: true,
					callback: (delta: number) => {
						this.move("y", this.speed[this.currentSpeed], delta);
					},
				},
				left: {
					autoFireException: true,
					callback: (delta: number) => {
						this.move("x", -this.speed[this.currentSpeed], delta);
					},
				},
				right: {
					autoFireException: true,
					callback: (delta: number) => {
						this.move("x", this.speed[this.currentSpeed], delta);
					},
				},
				button0: {
					callback: (delta: number) => {
						// console.log(this.charName, " 0");
					},
				},
				button1: {
					callback: (delta: number) => {
						// console.log(this.charName, " 1");
					},
				},
				button2: {
					callback: (delta: number) => {
						// console.log(this.charName, " 2");
					},
				},
				button3: {
					callback: (delta: number) => {
						// console.log(this.charName, " 3");
					},
				},
				button4: {
					callback: (delta: number) => {
						// console.log(this.charName, " 4");
					},
				},
				button5: {
					callback: (delta: number) => {
						// console.log(this.charName, " 5");
					},
				},
			},
			axes: {
				bindings: {
					moveX: {
						callback: (delta: number, offset: number) => {
							this.move("x", this.speed[this.currentSpeed], delta, offset);
						},
					},
					moveY: {
						callback: (delta: number, offset: number) => {
							this.move("y", this.speed[this.currentSpeed], delta, offset);
						},
					},
					cameraX: {
						callback: (delta: number, offset: number) => {
							// console.log("axis 2", offset);
						},
					},
					cameraY: {
						callback: (delta: number, offset: number) => {
							// console.log("axis 3", offset);
						},
					},
				},
				options: {
					normalize: false,
					invertLeftY: false,
					invertRightY: false,
				},
			},
		};

		controls.addKeyboardScheme(this.charName, test);
		controls.addGamepadScheme(this, test2);

		// setTimeout(() => {
		// 	controls.addGamepadScheme(this, test2);
		// }, 200);

		this.onLoad();
	}

	onLoad() {
		// console.log(this.controls);
	}

	public move(axis: "x" | "y", offset: number, delta = 1, additionalOffset = 1) {
		if (offset !== 0) this[axis] += offset * delta * additionalOffset;
	}
}
