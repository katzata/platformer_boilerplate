import * as PIXI from "pixi.js";

interface SpritePortionOptions {
	frame?: {
		x?: number;
		y?: number;
		width?: number;
		height?: number;
	};
}

/**
 * Generate a portion of an already cached texture.
 * @param baseTextureName The cached texture name.
 * @param {Object} options Parameters for the new texture.
 * @param {SpritePortionOptions} options.frame The portion of the image to be displayed.
 * @returns Either a portion of a texture, or a white square texture.
 */
export const generateTexturePortion = async (baseTextureName: string, options?: SpritePortionOptions) => {
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
