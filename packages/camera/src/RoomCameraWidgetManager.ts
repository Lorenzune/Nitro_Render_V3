import { IRoomCameraWidgetEffect, IRoomCameraWidgetManager, IRoomCameraWidgetSelectedEffect } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { GetConfiguration } from '@nitrots/configuration';
import { GetEventDispatcher, RoomCameraWidgetManagerEvent } from '@nitrots/events';
import { TextureUtils } from '@nitrots/utils';
import { BLEND_MODES, ColorMatrix, ColorMatrixFilter, Container, Filter, Sprite, Texture } from 'pixi.js';
import { RoomCameraWidgetEffect } from './RoomCameraWidgetEffect';

export class RoomCameraWidgetManager implements IRoomCameraWidgetManager
{
    private _effects: Map<string, IRoomCameraWidgetEffect> = new Map();
    private _isLoaded: boolean = false;

    public async init(): Promise<void>
    {
        if(this._isLoaded) return;

        this._isLoaded = true;

        const imagesUrl = GetConfiguration().getValue<string>('image.library.url') + 'Habbo-Stories/';
        const effects = GetConfiguration().getValue<{ name: string, colorMatrix?: ColorMatrix, minLevel: number, blendMode?: BLEND_MODES, enabled: boolean }[]>('camera.available.effects');

        for(const effect of effects)
        {
            if(!effect.enabled) continue;

            const cameraEffect = new RoomCameraWidgetEffect(effect.name, effect.minLevel);

            if(effect.colorMatrix.length)
            {
                // Config offsets (indices 4,9,14,19) follow Flash's 0-255 convention.
                // PixiJS v8 expects the full matrix in 0-1 space, so normalise them.
                const m = [ ...effect.colorMatrix ] as ColorMatrix;
                m[4]  /= 255;
                m[9]  /= 255;
                m[14] /= 255;
                m[19] /= 255;
                cameraEffect.colorMatrix = m;
            }
            else
            {
                const url = `${ imagesUrl }${ effect.name }.png`;

                await GetAssetManager().downloadAsset(url);

                cameraEffect.texture = GetAssetManager().getTexture(url);
                cameraEffect.blendMode = effect.blendMode;
            }

            this._effects.set(cameraEffect.name, cameraEffect);
        }

        GetEventDispatcher().dispatchEvent(new RoomCameraWidgetManagerEvent(RoomCameraWidgetManagerEvent.INITIALIZED));
    }

    public async applyEffects(texture: Texture, effects: IRoomCameraWidgetSelectedEffect[], isZoomed: boolean): Promise<HTMLImageElement>
    {
        const container = new Container();
        const sprite = new Sprite(texture);

        container.addChild(sprite);

        if(isZoomed) sprite.scale.set(2);

        const filters: Filter[] = [];

        const identityMatrix: ColorMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

        for(const selectedEffect of effects)
        {
            const effect = selectedEffect.effect;

            if(!effect) continue;

            if(effect.colorMatrix)
            {
                const filter = new ColorMatrixFilter();
                const strength = selectedEffect.strength;

                filter.matrix = effect.colorMatrix.map((val, i) => identityMatrix[i] + (val - identityMatrix[i]) * strength) as ColorMatrix;

                filters.push(filter);
            }
            else
            {
                const effectSprite = new Sprite(effect.texture);

                effectSprite.alpha = selectedEffect.strength;
                effectSprite.blendMode = effect.blendMode;

                container.addChild(effectSprite);
            }
        }

        container.filters = filters;

        return await TextureUtils.generateImage(container);
    }

    public get effects(): Map<string, IRoomCameraWidgetEffect>
    {
        return this._effects;
    }

    public get isLoaded(): boolean
    {
        return this._isLoaded;
    }
}
