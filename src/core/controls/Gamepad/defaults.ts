export const gamepadDefaults = {
	buttons: {
		up: {
			// Uncomment to stop auto execution of the directional keys.
			// Enabled by default
			// autoFireException: false,
			callback: (delta: number) => console.log("up"),
		},
		down: {
			// Uncomment to stop auto execution of the directional keys.
			// Enabled by default
			// autoFireException: false,
			callback: (delta: number) => console.log("down"),
		},
		left: {
			// Uncomment to stop auto execution of the directional keys.
			// Enabled by default
			// autoFireException: false,
			callback: (delta: number) => console.log("left"),
		},
		right: {
			// Uncomment to stop auto execution of the directional keys.
			// Enabled by default
			// autoFireException: false,
			callback: (delta: number) => console.log("right"),
		},
		button0: {
			// Uncomment to start auto execution of button0 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button0"),
		},
		button1: {
			// Uncomment to start auto execution of button1 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button1"),
		},
		button2: {
			// Uncomment to start auto execution of button2 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button2"),
		},
		button3: {
			// Uncomment to start auto execution of button3 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button3"),
		},
		button4: {
			// Uncomment to start auto execution of button4 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button4"),
		},
		button5: {
			// Uncomment to start auto execution of button5 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button5"),
		},
		button6: {
			// Uncomment to start auto execution of button6 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button6"),
		},
		button7: {
			// Uncomment to start auto execution of button7 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button7"),
		},
		button8: {
			// Uncomment to start auto execution of button8 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button8"),
		},
		button9: {
			// Uncomment to start auto execution of button9 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button9"),
		},
		button10: {
			// Uncomment to start auto execution of button10 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button10"),
		},
		button11: {
			// Uncomment to start auto execution of button11 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button11"),
		},
		button12: {
			// Uncomment to start auto execution of button12 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button12"),
		},
		button13: {
			// Uncomment to start auto execution of button13 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button13"),
		},
		button14: {
			// Uncomment to start auto execution of button14 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button14"),
		},
		button15: {
			// Uncomment to start auto execution of button15 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button15"),
		},
		button16: {
			// Uncomment to start auto execution of button16 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button16"),
		},
		button17: {
			// Uncomment to start auto execution of button17 !!!will override the set auto fire behavior!!!.
			// Disabled by default
			// autoFireException: true,
			callback: (delta: number) => console.log("button17"),
		},
	},
	axes: {
		bindings: {
			moveX: {
				callback: (delta: number, offset: number) => console.log("axis 0", offset),
			},
			moveY: {
				callback: (delta: number, offset: number) => console.log("axis 1", offset),
			},
			cameraX: {
				callback: (delta: number, offset: number) => console.log("axis 2", offset),
			},
			cameraY: {
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

export const gamepadDefaultMap = [
	{
		name: "xbox",
		scheme: {
			12: "up",
			13: "down",
			14: "left",
			15: "right",
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
			11: "button11",
			16: "button16",
			17: "button17",
		},
		settings: {
			invertAxisL: false,
			invertAxisR: false,
		},
	},
];
