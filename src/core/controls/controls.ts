import config from "./controlsConfig.json";
import GamepadController from "./Gamepad/GamepadController";
import KeyboardController from "./Keyboard/KeyboardController";
import { controlsTypes, gamepadTypes, keyboardTypes } from "./types";
import type Char from "../scene/chars/Char";

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
	public addKeyboardScheme(playerName: string, controlScheme?: Record<string, controlsTypes.Binding>) {
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
	public addGamepadScheme(player: Char, controlScheme?: gamepadTypes.GamepadScheme) {
		this.gamepad.addScheme(player.charName, controlScheme);
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
