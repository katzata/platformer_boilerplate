import config from "./controlsConfig.json";
import GamepadController, { gamepadTypes } from "./Gamepad/GamepadController";
import KeyboardController from "./Keyboard/KeyboardController";

export namespace controlsTypes {
	export interface Binding {
		callback: (delta?: number) => void;
	}

	export interface KeyboardScheme {
		[key: string]: Record<string, controlsTypes.Binding>;
	}
}

class Controls {
	config = config;
	keyboard: KeyboardController;
	gamepad: GamepadController;

	constructor() {
		this.keyboard = new KeyboardController();
		this.gamepad = new GamepadController();
	}

	/**
	 * Add a keyboard controls scheme.
	 */
	public addKeyboardScheme(playerName: string, controlScheme: Record<string, controlsTypes.Binding>) {
		this.keyboard.addScheme(playerName, controlScheme);
	}

	/**
	 * Remove an already existing controls scheme.
	 */
	public removeKeyboardScheme(playerName: string) {
		this.keyboard.removeScheme(playerName);
	}

	/**
	 * Add a keyboard controls scheme.
	 */
	public addGamepadScheme(playerName: string, controlScheme: gamepadTypes.GamepadScheme) {
		this.gamepad.addScheme(playerName, controlScheme);
	}

	/**
	 * Remove an already existing controls scheme.
	 */
	public removeGamepadScheme(playerName: string) {
		this.gamepad.removeScheme(playerName);
	}
}

const controls = new Controls();

export default controls;
