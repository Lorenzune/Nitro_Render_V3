import { BrowserAdapter, DOMAdapter, HelloSystem, TextureSource } from 'pixi.js';

HelloSystem.defaultOptions.hello = true;
const usePixelPerfectTextures = !(window.devicePixelRatio % 1) || (window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints > 0);

TextureSource.defaultOptions.scaleMode = usePixelPerfectTextures ? 'nearest' : 'linear';
DOMAdapter.set(BrowserAdapter);

export * from '@nitrots/api';
export * from '@nitrots/assets';
export * from '@nitrots/avatar';
export * from '@nitrots/camera';
export * from '@nitrots/communication';
export * from '@nitrots/configuration';
export * from '@nitrots/events';
export * from '@nitrots/localization';
export * from '@nitrots/room';
export * from '@nitrots/session';
export * from '@nitrots/sound';
export * from '@nitrots/utils';
export * from './DevTools';
export * from './pixi-proxy';
