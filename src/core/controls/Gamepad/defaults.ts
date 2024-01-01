export interface GamepadBindings {
	name: string;
	scheme: Record<string, string>;
	settings: {
		invertAxisL: false;
		invertAxisR: false;
	};
}

export const gamepadDefaults = {
	buttons: {
		up: {
			callback: (delta: number) => console.log("up"),
		},
		down: {
			callback: (delta: number) => console.log("down"),
		},
		left: {
			callback: (delta: number) => console.log("left"),
		},
		right: {
			callback: (delta: number) => console.log("right"),
		},
		button0: {
			callback: (delta: number) => console.log("button0"),
		},
		button1: {
			callback: (delta: number) => console.log("button1"),
		},
		button2: {
			callback: (delta: number) => console.log("button2"),
		},
		button3: {
			callback: (delta: number) => console.log("button3"),
		},
		button4: {
			callback: (delta: number) => console.log("button4"),
		},
		button5: {
			callback: (delta: number) => console.log("button5"),
		},
	},
	axes: {
		bindings: {
			"0": {
				callback: (delta: number, offset: number) => console.log("axis 0", offset),
			},
			"1": {
				callback: (delta: number, offset: number) => console.log("axis 1", offset),
			},
			"2": {
				callback: (delta: number, offset: number) => console.log("axis 2", offset),
			},
			"3": {
				callback: (delta: number, offset: number) => console.log("axis 3", offset),
			},
		},
		options: {
			normalize: false,
			invertLeftY: false,
			invertRightY: false,
		},
	},
};

export const gamepadDefaultMap: GamepadBindings[] = [
	{
		name: "xbox",
		scheme: {
			11: "up",
			12: "down",
			13: "left",
			14: "right",
			0: "button0",
			1: "button1",
			2: "button2",
			3: "button3",
			4: "button4",
			5: "button5",
			6: "button6",
			7: "button7",
			8: "button8",
			9: "button9",
			10: "button10",
		},
		settings: {
			invertAxisL: false,
			invertAxisR: false,
		},
	},
];
