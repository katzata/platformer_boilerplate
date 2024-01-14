import * as PIXI from "pixi.js";

interface EntityMovement {
	move: (delta: number) => void;
	axes: string[];
	fps: number;
	lastInputs?: string[];
	inputsToStore: number;
}

interface EntityCoordBounds {
	x?: {
		min?: number;
		max?: number;
		bufferOffset?: number;
		velocityStep?: number;
	};
	y?: {
		min?: number;
		max?: number;
		bufferOffset?: number;
		velocityStep?: number;
	};
	limitToBounds: boolean;
}

export interface EntityOptions {
	bounds?: EntityCoordBounds;
	scale?: Record<string, number>;
	inputsToStore?: number;
}

export interface EntityMoveOptions {
	duration?: number;
	speed?: number;
	accelDuration?: {
		start: number;
		end: number;
	};
}

export default class Entity extends PIXI.Sprite {
	movement: EntityMovement = {
		move: null,
		axes: ["x", "y"],
		fps: 60,
		lastInputs: [],
		inputsToStore: 0,
	};

	coordBounds: EntityCoordBounds = {
		x: {
			min: 0,
			max: window.innerWidth,
			bufferOffset: 0,
			velocityStep: 0,
		},
		y: {
			min: 0,
			max: window.innerHeight,
			bufferOffset: 0,
			velocityStep: 0,
		},
		limitToBounds: false,
	};

	constructor(name: string, options: EntityOptions) {
		super();

		this.texture = PIXI.Texture.from(name);
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;

		if (options?.inputsToStore > 1) this.movement.inputsToStore = options.inputsToStore;
		if (options.bounds.limitToBounds) this.coordBounds.limitToBounds = true;

		this.initPositioning(options.bounds, options.scale);
		this.initMovement();
	}

	/**
	 * Initialize the entity's positioning.
	 * @param bounds Set a "bounding box" to the entity (if movable).
	 * @param scale Set the sprite scale.
	 */
	private initPositioning(bounds?: EntityCoordBounds, scale?: Record<string, number>) {
		const axes = ["x", "y"];

		for (const axis of axes) {
			if (bounds && bounds[axis]) Object.assign(this.coordBounds[axis], bounds[axis]);
			if (scale && scale[axis]) this.scale[axis] = scale[axis];

			if (this.coordBounds.limitToBounds && !bounds && !bounds[axis]) {
				this.coordBounds[axis].bufferOffset = this.texture.orig[`${axis === "x" ? "width" : "height"}`] / 2;
			}
		}
	}

	/**
	 * Initialize the entity's movement.
	 */
	private initMovement() {
		PIXI.Ticker.shared.add((delta) => {
			if (this.movement.move) this.movement.move(delta);
		});
	}

	/**
	 * Move the entity to a new location.
	 * @param dest The destination coords.
	 * @param options Movement options
	 * @param options.duration The move duration (in ms).
	 * @param options.speed The distance to move on each frame (has precedence over duration).
	 * @param options.accelDuration The duration for which the entity will reach it's max speed.
	 * @param options.accelDuration.start The duration when starting from idle.
	 * @param options.accelDuration.end The duration when stopping to idle.
	 */
	public moveToCoords = async (dest: PIXI.Point, options?: EntityMoveOptions): Promise<void> => {
		const direction = { x: 1, y: 1 };
		const step = { x: 0, y: 0 };

		for (const axis of this.movement.axes) {
			direction[axis] = this[axis] > dest[axis] ? -1 : 1;
			const axis2 = axis === "y" ? "x" : "y";

			if (options?.speed) {
				const axis1Calc = Math.abs(dest[axis] - this[axis]);
				const axis2Calc = Math.abs(dest[axis2] - this[axis2]);
				const stepReducer = axis1Calc < axis2Calc ? axis1Calc / axis2Calc : 1;

				step[axis] = options.speed * stepReducer * direction[axis];
			} else {
				step[axis] = (dest[axis] - this[axis]) / ((options.duration ?? 0) * 100);
			}
		}

		return new Promise((res) => {
			const moveTo = (delta: number) => {
				let check = { x: true, y: true };
				let isFinalStep = { x: false, y: false };

				for (const axis of this.movement.axes) {
					check[axis] = direction[axis] > 0 ? this[axis] < dest[axis] : this[axis] > dest[axis];
					isFinalStep[axis] =
						direction[axis] > 0
							? this[axis] >= dest[axis] - step[axis] * delta
							: this[axis] <= dest[axis] - step[axis] * delta;
				}

				if (check.x || check.y) {
					for (const axis of this.movement.axes) {
						this[axis] = !isFinalStep[axis] ? this[axis] + step[axis] * delta : dest[axis];
					}
				} else {
					this.movement.move = null;
					// PIXI.Ticker.shared.remove(moveTo);
					res(null);
				}
			};

			// if (this.movement.move) return;

			this.movement.move = moveTo;

			// PIXI.Ticker.shared.add(moveTo);
		});
	};

	public rotate(rotateTo: Record<any, any>) {
		this.rotation = -Math.atan2(this.x - rotateTo.x, this.y - rotateTo.y);
	}
}
