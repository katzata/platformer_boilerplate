import vertex from "../defaultVert.vert";
import fragment from "./shockwave.frag";
import { Filter } from "@pixi/core";
import type { Point, CLEAR_MODES, FilterSystem, RenderTexture } from "@pixi/core";

export type PointLike = Point | number[];

export interface ShockwaveFilterOptions {
	center?: [number, number];
	amplitude?: number;
	wavelength?: number;
	brightness?: number;
	radius?: number;
	resolution?: number;
	time?: number;
	speed?: number;
	repeat?: boolean;
	maxTime?: number;
}

export default class ShockwaveFilter extends Filter {
	public static readonly defaults: ShockwaveFilterOptions = {
		center: [0, 0],
		amplitude: 30.0,
		wavelength: 160.0,
		brightness: 1.0,
		radius: 360,
		resolution: 1,
		time: 0,
		speed: 2.0,
		repeat: false,
		maxTime: 360 / 1.5,
	};

	public time: number;
	public maxTime: number;
	public repeat: boolean;

	constructor(center?: PointLike, options?: Partial<ShockwaveFilterOptions>) {
		super(vertex, fragment);

		Object.assign(this, ShockwaveFilter.defaults);

		if (options) Object.assign(this, options);
		if (center) this.uniforms.center = center;
	}

	apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clear: CLEAR_MODES): void {
		// There is no set/get of `time`, for performance.
		this.uniforms.time = this.time;
		this.time += this.speed;

		this.reset();

		filterManager.applyFilter(this, input, output, clear);
	}

	private reset() {
		const maxRadius = this.radius
			? this.radius / 1.5
			: Math.max(...(this.center as number[])) / 2 + this.wavelength;

		if (Math.abs(this.time) >= this.maxTime) {
			if (this.repeat) {
				this.time = 0;
			} else {
				this.enabled = false;
				this.time = 0;
			}
		}
	}

	// Sets the center of the shockwave in screen coords.
	get center(): PointLike {
		return this.uniforms.center;
	}
	set center(value: PointLike) {
		this.uniforms.center = value;
	}

	get amplitude(): number {
		return this.uniforms.amplitude;
	}
	set amplitude(value: number) {
		this.uniforms.amplitude = value;
	}

	get wavelength(): number {
		return this.uniforms.wavelength;
	}
	set wavelength(value: number) {
		this.uniforms.wavelength = value;
	}

	// The shockwave's brightness level.
	get brightness(): number {
		return this.uniforms.brightness;
	}
	set brightness(value: number) {
		this.uniforms.brightness = value;
	}

	get speed(): number {
		return this.uniforms.speed;
	}
	set speed(value: number) {
		this.uniforms.speed = value;
	}

	// The maximum radius of shockwave.
	// 0 means infinity.
	get radius(): number {
		return this.uniforms.radius;
	}
	set radius(value: number) {
		this.uniforms.radius = value;
	}
}

