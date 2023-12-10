import vertex from "../defaultVert.vert";
import fragment from "./twist.frag";
import { Filter, Point } from "@pixi/core";

interface TwistFilterOptions {
	radius: number;
	angle: number;
	padding: number;
	center: Point;
}

export default class TwistFilter extends Filter {
	public static readonly defaults: TwistFilterOptions = {
		radius: 200,
		angle: 4,
		padding: 20,
		center: new Point(),
	};

	constructor(options?: Partial<TwistFilterOptions>) {
		super(vertex, fragment);

		Object.assign(this, TwistFilter.defaults, options);
	}

	get center(): Point {
		return this.uniforms.center;
	}

	set center(value: Point) {
		this.uniforms.center = value;
	}

	get radius(): number {
		return this.uniforms.radius;
	}

	set radius(value: number) {
		this.uniforms.radius = value;
	}

	get angle(): number {
		return this.uniforms.angle;
	}

	set angle(value: number) {
		this.uniforms.angle = value;
	}
}

export type { TwistFilterOptions };
