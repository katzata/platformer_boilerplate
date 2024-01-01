import * as PIXI from "pixi.js";
import { gamepadDefaults, gamepadDefaultMap } from "./defaults";
import { utils } from "../../core";

export namespace gamepadTypes {
	export interface GamepadScheme {
		buttons?: Record<string, ButtonMap>;
		axes?: {
			bindings: AxesMap;
			options: GamepadAxesOptions;
		};
	}

	export interface GamepadAxesOptions {
		normalize?: boolean;
		invertLeftY?: boolean;
		invertRightY?: boolean;
	}

	export interface ButtonMap {
		action?: string;
		playerId?: string;
		callback?: (delta?: number) => void;
	}

	export interface AxesMap {
		[key: string]: {
			callback: (delta: number, offset: number) => void;
		};
	}
}

export default class GamepadController {
	index: number = null;
	keyBindings: Record<string, string> = {};
	controlSchemes: gamepadTypes.GamepadScheme = {};
	axesDeadZone: number = 0.099;
	switchDPadToAnalog: boolean = false;

	constructor() {
		window.addEventListener("gamepadconnected", this.initGamepad);
		window.addEventListener("gamepaddisconnected", this.removeGamepad);
	}

	/**
	 * Initialize a gamepad and add a check function to the shared ticker.
	 * @param e The initial gamepad event (when activated).
	 */
	private initGamepad = (e: GamepadEvent) => {
		const { id, index, buttons, axes } = e.gamepad;

		this.index = index;
		this.keyBindings = gamepadDefaultMap[0].scheme;

		console.log(`Gamepad : ${id} with ${buttons.length} buttons, ${axes.length} axes connected.`);
		PIXI.Ticker.shared.add(this.onEvent);
	};

	private removeGamepad = (e: GamepadEvent) => {
		console.log(`Gamepad : ${e.gamepad.id} disconnected.`);
		PIXI.Ticker.shared.remove(this.onEvent);
	};

	/**
	 * Monitor for button presses and analog stick movement
	 * @returns void
	 */
	public onEvent = (delta: number) => {
		if (isNaN(this.index)) return;

		this.handleButtons(delta);
		this.handleAnalogs(delta, { invertLeftY: false });
	};

	public addScheme(playerName: string, controlScheme: gamepadTypes.GamepadScheme) {
		const filteredScheme = this.removeDuplicateKeys(playerName, controlScheme);
		const newScheme = gamepadDefaults;
		const playerId = utils.removeTextSpaces(playerName);

		for (const key in filteredScheme) {
			newScheme[key] = {
				playerId,
				...filteredScheme[key],
			};
		}

		this.controlSchemes = newScheme;
		Object.assign(this.controlSchemes, newScheme);
	}

	private removeDuplicateKeys(playerName: string, controlScheme: gamepadTypes.GamepadScheme) {
		if (!this.controlSchemes?.buttons?.length && !this.controlSchemes?.axes?.bindings.length) return controlScheme;

		const playerId = utils.removeTextSpaces(playerName);
		const filteredBindings = Object.entries(this.controlSchemes.buttons).filter(
			(binding) => binding[1].playerId === playerId,
		);

		for (const [filteredKey, binding] of filteredBindings) {
			for (const key in controlScheme) {
				if (filteredKey !== key && controlScheme[key].callback) continue;

				binding.callback = controlScheme[key].callback;
			}
		}

		return filteredBindings;
	}

	/**
	 * Remove an already existing scheme
	 */
	public removeScheme(playerName: string) {
		const playerId = utils.removeTextSpaces(playerName);

		const toRemove = Object.entries({
			...this.controlSchemes.buttons,
			...this.controlSchemes.axes.bindings,
		}).filter((binding) => (binding[1] as gamepadTypes.ButtonMap).playerId === playerId);

		for (const [key] of toRemove) {
			if (this.controlSchemes[key]) delete this.controlSchemes[key];
		}
	}

	/**
	 * Handle all button presses.
	 * @param {controlsTypes.GamepadExtended} gamepad The actual Gamepad instance.
	 * @returns void
	 */
	private handleButtons(delta: number) {
		const buttons = this.getGamepad().buttons;
		const pressed = [];
		let end = buttons.length - 1;

		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].pressed) pressed.push(i);
			if (i === end) break;
			if (buttons[end--].pressed) pressed.push(end);
		}

		if (!pressed.length) return;

		for (const key of pressed) {
			if (!this.keyBindings[key] || !this.controlSchemes.buttons[this.keyBindings[key]]) continue;

			const binding = this.controlSchemes.buttons[this.keyBindings[key]];

			if (binding.callback) binding.callback(delta);
		}
	}

	/**
	 * Get the corrected axes offset
	 * @param index The gamepad that is currently firing the event.
	 * @returns An array consisting of the gamepad's analog sticks offsets.
	 */
	private handleAnalogs(delta: number, options?: gamepadTypes.GamepadAxesOptions) {
		const axes = this.getGamepad().axes.map((value, idx) => {
			const test = true;
			let offsetL = test ? value * -1 : value;
			let directionCalc =
				value > 0
					? (value - this.axesDeadZone) / (1 - this.axesDeadZone)
					: (value - this.axesDeadZone * -1) / (1 - this.axesDeadZone);

			if (options?.invertLeftY && idx === 1) directionCalc = directionCalc * -1;
			if (options?.invertRightY && idx === 3) directionCalc = directionCalc * -1;

			return Math.abs(offsetL) > this.axesDeadZone ? directionCalc : 0;
		});

		for (let i = 0; i < axes.length; i++) {
			if (axes[i] === 0) continue;

			this.controlSchemes.axes.bindings[i]?.callback(delta, axes[i]);
		}
	}

	/**
	 * Get the currently assigned gamepad.
	 * @param {number} index The gamepad index.
	 * @returns The gamepad reference.
	 */
	private getGamepad() {
		return window.navigator.getGamepads()[this.index];
	}
}
