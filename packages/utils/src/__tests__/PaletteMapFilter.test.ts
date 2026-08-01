import { describe, expect, it } from 'vitest';
import { PaletteMapFilter } from '../filters/PaletteMapFilter';

const PALETTE = [ 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFFFF ];

const createFilter = () => new PaletteMapFilter({
    palette: PALETTE,
    channel: PaletteMapFilter.CHANNEL_RED
});

describe('PaletteMapFilter', () =>
{
    it('releases its lookup texture on destroy', () =>
    {
        const filter = createFilter();
        const lutSource = filter.resources.uLutTexture;

        expect(lutSource).toBeTruthy();
        expect(lutSource.destroyed).toBe(false);

        filter.destroy();

        expect(lutSource.destroyed).toBe(true);
    });

    it('leaves the shared gl program alone', () =>
    {
        // GlProgram.from() caches by source, so every instance points at the same program.
        // Destroying it with one filter would break every other avatar using the palette map.
        const first = createFilter();
        const second = createFilter();

        expect(first.glProgram).toBe(second.glProgram);

        const sharedProgram = second.glProgram;

        first.destroy();

        expect(second.glProgram).toBe(sharedProgram);
        expect(second.resources.uLutTexture.destroyed).toBe(false);

        second.destroy();
    });

    it('is safe to destroy twice', () =>
    {
        const filter = createFilter();

        filter.destroy();

        expect(() => filter.destroy()).not.toThrow();
    });

    it('gives each instance its own lookup texture', () =>
    {
        const first = createFilter();
        const second = createFilter();

        expect(first.resources.uLutTexture).not.toBe(second.resources.uLutTexture);

        first.destroy();
        second.destroy();
    });
});
