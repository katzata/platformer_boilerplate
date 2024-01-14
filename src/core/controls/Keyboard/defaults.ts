export const keyboardDefaultMap = {
	mapping1: {
		ArrowUp: "up",
		ArrowDown: "down",
		ArrowLeft: "left",
		ArrowRight: "right",
		KeyA: "button1",
		KeyS: "button2",
		KeyD: "button3",
		KeyQ: "button4",
		KeyW: "button5",
		KeyE: "button6",
	},
	mapping2: {
		Numpad8: "up",
		Numpad5: "down",
		Numpad4: "left",
		Numpad6: "right",
		KeyJ: "button1",
		KeyK: "button2",
		KeyL: "button3",
		KeyU: "button4",
		KeyI: "button5",
		KeyO: "button6",
	},
};

export const keyboardDefaults = {
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
	button6: {
		callback: (delta: number) => console.log("button6"),
	},
};
