import vertex from "../defaultVert.vert";
import fragment from "./radialBlur.frag";
import { Filter } from "@pixi/core";
import type { Point, CLEAR_MODES, FilterSystem, RenderTexture } from "@pixi/core";

type PointLike = Point | number[];

export interface RadialBlurFilterOptions {
	angle?: number;
	center?: number[];
	kernelSize?: number;
	radius?: number;
	animate?: boolean;
	animSpeed?: number;
	animateRadius?: boolean;
	animateAngle?: boolean;
}

export default class RadialBlurFilter extends Filter {
	static defaults = {
		angle: 20,
		center: [0, 0],
		kernelSize: 9,
		radius: -1,
		animSpeed: 0,
		animateRadius: false,
		animateAngle: false,
	};

	public kernelSize: number;
	private targetAngle = 0;
	private targetRadius = 0;
	private _angle = 0;
	private animSpeed = 0;
	private angleSpeed = 0;
	private radiusSpeed = 0;
	private animateRadius = false;
	private animateAngle = false;

	constructor(options: RadialBlurFilterOptions) {
		super(vertex, fragment);

		Object.assign(this, RadialBlurFilter.defaults, options);

		if (options.animateRadius || options.animateAngle) {
			this.targetAngle = options.angle || this.angle;
			this.targetRadius = options.radius || this.radius;

			if (!options.hasOwnProperty("animateRadius")) {
				this.radius = options?.radius || this.radius;
			} else {
				if (options.animateRadius) {
					this.radiusSpeed = (this.radius * this.animSpeed) / 100;
					this.radius = 0;
				} else {
					this.radius = options?.radius || this.radius;
				}
			}

			if (!options.hasOwnProperty("animateAngle")) {
				this.angle = options?.angle || this.angle;
			} else {
				if (options.animateAngle) {
					this.angleSpeed = (this.angle * this.animSpeed) / 100;
					this.angle = 0;
				} else {
					this.angle = options.angle || this.angle;
				}
			}
		}
	}

	apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clear: CLEAR_MODES): void {
		this.uniforms.uKernelSize = this.kernelSize;
		this.uniforms.uRadian = (this.angle * Math.PI) / 180;

		if (this.animateRadius || this.animateAngle) {
			// if (this.radius < this.targetRadius) this.radius += this.animSpeed;
			if (this.animateAngle && this.angle < this.targetAngle) this.angle += this.angleSpeed;
			if (this.animateRadius && this.radius < this.targetRadius) this.radius += this.radiusSpeed;
			console.log(this.angleSpeed);

			if (this.animateRadius && this.radius > this.targetRadius) this.animateRadius = false;
			if (this.animateAngle && this.angle > this.targetAngle) this.animateAngle = false;
		}

		filterManager.applyFilter(this, input, output, clear);
	}

	set angle(value: number) {
		this._angle = value;
		this.uniforms.uRadian = (value * Math.PI) / 180;
	}

	get angle(): number {
		return this._angle;
	}

	get center(): PointLike {
		return this.uniforms.uCenter;
	}

	set center(value: PointLike) {
		this.uniforms.uCenter = value;
	}

	get radius(): number {
		return this.uniforms.uRadius;
	}

	set radius(value: number) {
		if (value < 0 || value === Infinity) value = -1;
		this.uniforms.uRadius = value;
	}
}

export { RadialBlurFilter };

