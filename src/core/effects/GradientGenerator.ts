import * as PIXI from "pixi.js";

export interface GradientOptions {
	colorStops?: ([number, string] | string)[];
	type?: string | "linear" | "radial";
	width?: number;
	height?: number;
	quality?: number;
	radiuses?: number[] | [number, number];
	instances?: number;
	cropped?: boolean;
	radiusOffsets?: { x: number; y: number } | { x: number; y: number }[];
}

export default class GradientGenerator {
	public static defaults = {
		colorStops: ["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)"],
		type: "linear",
		width: 100,
		height: 100,
		quality: 128,
		radiuses: [],
		instances: 1,
		cropped: false,
		radiusOffsets: { x: 0, y: 0 },
	};

	settings: GradientOptions = {};
	instances: PIXI.Sprite[];

	public generateGradient(props?: GradientOptions) {
		Object.assign(this.settings, GradientGenerator.defaults, props);
		const gradientTexture = this.generateTexture();

		this.instances = [];

		for (let i = 0; i < this.settings.instances; i++) {
			const sprite = new PIXI.Sprite(gradientTexture);
			sprite.name = `${props.type}Gradient`;
			sprite.width = this.settings.width;
			sprite.height = this.settings.height;

			this.instances.push(sprite);
		}

		return this.instances;
	}

	private generateTexture() {
		const { type, width, height, colorStops, quality, radiuses } = this.settings;
		const gradientType = type[0].toLocaleUpperCase() + type.slice(1);

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		// Check if the gradient type exists
		if (!ctx[`create${gradientType}Gradient`]) return;

		const rectDimensions: number[] = [
			0,
			0,
			type === "linear" ? quality : this.cropSize("canvas", width),
			type === "linear" ? 1 : this.cropSize("canvas", height),
		];
		// Return gradient appropriate settings
		// Linear x, y, width, height; (altho in this case we don't use width and height as expected).
		// Radial x1, x2, r1, x2, y2, r2; !!!the radiuses can't overlap (causes glitches)!!!
		const props =
			type === "linear"
				? [0, 0, quality, 0]
				: [
						this.cropSize("texture", width) + this.getOffset(0).x,
						this.cropSize("texture", height) + this.getOffset(0).y,
						radiuses[0] || 0,
						this.cropSize("texture", width) + this.getOffset(1).x,
						this.cropSize("texture", height) + this.getOffset(1).y,
						radiuses[1] || 0,
				  ];

		// Generate gradient type (linear or radial)
		const gradient = ctx[`create${gradientType}Gradient`](...props);

		canvas.width = type === "linear" ? quality : this.cropSize("canvas", width);
		canvas.height = type === "linear" ? 1 : this.cropSize("canvas", height);

		this.addColorStops(gradient, colorStops);

		ctx.fillStyle = gradient;

		// @ts-ignore tuple...
		ctx.fillRect(...rectDimensions);

		return PIXI.Texture.from(canvas);
	}

	private getCanvasSize() {
		return Math.max(this.settings.width, this.settings.height);
	}

	private cropSize(type: string, size: number) {
		const divider = type === "canvas" ? 1 : 2;
		return !this.settings.cropped ? this.getCanvasSize() / divider : size / divider;
	}

	private getOffset(index: number) {
		return this.settings.radiusOffsets instanceof Array
			? this.settings.radiusOffsets[index] || this.settings.radiusOffsets[0]
			: this.settings.radiusOffsets;
	}

	private addColorStops(gradient: CanvasGradient, colorStops: ([number, string] | string)[]) {
		for (let i = 0; i < colorStops.length; i++) {
			const stops = colorStops[i] instanceof Array ? colorStops[i] : [i / colorStops.length, colorStops[i]];
			// @ts-ignore tuple...
			gradient.addColorStop(...stops);
		}
	}
}
