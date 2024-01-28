export const gamepadDefaults = {
	buttons: {
		up: (delta?: number) => {
			console.log("up");
		},
		down: (delta?: number) => {
			console.log("down");
		},
		left: (delta?: number) => {
			console.log("left");
		},
		right: (delta?: number) => {
			console.log("right");
		},
		button0: (delta?: number) => {
			console.log("button 0");
		},
		button1: (delta?: number) => {
			console.log("button 1");
		},
		button2: (delta?: number) => {
			console.log("button 2");
		},
		button3: (delta?: number) => {
			console.log("button 3");
		},
		button4: (delta?: number) => {
			console.log("button 4");
		},
		button5: (delta?: number) => {
			console.log("button 5");
		},
		button6: (delta?: number) => {
			console.log("button 6");
		},
		button7: (delta?: number) => {
			console.log("button 7");
		},
		button8: (delta?: number) => {
			console.log("button 8");
		},
		button9: (delta?: number) => {
			console.log("button 9");
		},
		button10: (delta?: number) => {
			console.log("button 10");
		},
		button11: (delta?: number) => {
			console.log("button 11");
		},
		button12: (delta?: number) => {
			console.log("button 12");
		},
		button13: (delta?: number) => {
			console.log("button 13");
		},
		button14: (delta?: number) => {
			console.log("button 14");
		},
		button15: (delta?: number) => {
			console.log("button 15");
		},
		button16: (delta?: number) => {
			console.log("button 16");
		},
		button17: (delta?: number) => {
			console.log("button 17");
		},
	},
	axes: {
		bindings: {
			moveX: (delta?: number, offset?: number) => console.log("axis 1", offset),
			moveY: (delta?: number, offset?: number) => console.log("axis 1", offset),
			cameraX: (delta?: number, offset?: number) => console.log("axis 2", offset),
			cameraY: (delta?: number, offset?: number) => console.log("axis 2", offset),
		},
		options: {
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
