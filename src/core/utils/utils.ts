import * as PIXI from "pixi.js";
import * as types from "./utilTypes";

/**
 * Generate a portion of an already cached texture.
 * @param baseTextureName The cached texture name.
 * @param {Object} options Parameters for the new texture.
 * @param {types.SpritePortionOptions} options.frame The portion of the image to be displayed.
 * @returns Either a portion of a texture, or a white square texture.
 */
export const generateTexturePortion = async (baseTextureName: string, options?: types.SpritePortionOptions) => {
	try {
		const baseTexture = PIXI.BaseTexture.from(baseTextureName);

		await baseTexture.resource.load();

		const texture = new PIXI.Texture(baseTexture);
		texture.frame = new PIXI.Rectangle(
			options?.frame?.x || 0,
			options?.frame?.y || 0,
			options?.frame?.width || baseTexture.realWidth,
			options?.frame?.height || baseTexture.realHeight,
		);

		return texture;
	} catch (err) {
		if (err.type === "error") {
			console.warn(`There is no ${baseTextureName} in the cache!`);
		} else {
			console.warn(err.message);
		}
	}

	return PIXI.Texture.WHITE;
};

/**
 * A ticker based delay that can trigger a callback.
 * @param {number | string} delay Time in milliseconds.
 * @param {types.DelayOptions} options Optional prop.
 * @returns Either the data from the callback or undefined.
 */
export const delay = (delay: number | string, options?: types.DelayOptions) => {
	const timeOffset = Number(delay) ?? 500 / 1000;
	let initialTs = performance.now();

	return new Promise((res, rej) => {
		const check = () => {
			const currentTs = performance.now();

			if (currentTs >= initialTs + timeOffset) {
				try {
					res(options.callBack());
				} catch (err) {
					console.warn(err.message);
					rej(err);
				}

				PIXI.Ticker.shared.remove(check);
			}
		};

		PIXI.Ticker.shared.add(check);
	});
};

/**
 * Remove all spaces from a text.
 * @param text The text that will be formatted
 * @returns The formatted text.
 */
export const removeSpaces = (text: string) => {
	return text.split(" ").join("");
};
