import { describe, it, expect } from 'vitest';
import { config } from './index';

describe('config fn', () => {
    it('should return a config object with default values', () => {
        const result = config();
        expect(result).toBeDefined();
        expect(result.platform).toBe('node');
        expect(result.entry).toBe('src/index.ts');
        expect(result.dts).toEqual({ sourcemap: true });
    });

    describe('entry options', () => {
      it('should handle the three explicit entry options correctly', () => {
        const indexEntry = config({ entry: 'index' });
        expect(indexEntry.entry).toBe('src/index.ts');
        const srcDir = config({ entry: 'srcDir' });
        expect(srcDir.entry).toBe('src/*.ts');
        const srcRecursive = config({ entry: 'srcRecursive' });
        expect(srcRecursive.entry).toBe('src/**/*.ts');

      })

      it('should handle custom string and object entries correctly', () => {
        const customSingleEntry = { 'main': 'main.ts' };
        const customSingleEntryResult = config({ entry: { 'main': 'main.ts' } });
        expect(customSingleEntryResult.entry).toEqual(customSingleEntry);

        const customMultiEntry = { 'main': 'main.ts', 'utils': 'utils.ts' };
        const customMultiEntryResult = config({ entry: { 'main': 'main.ts', 'utils': 'utils.ts' } });
        expect(customMultiEntryResult.entry).toEqual(customMultiEntry);
    });
  });

    it('should set inlineOnly correctly', () => {
        const inlineDeps = ['dep1', /dep2/];
        const result = config({ inlineDeps });
        expect(result.inlineOnly).toEqual(inlineDeps);
    });

    it('should apply overrides correctly', () => {
        const overrides = { dts: false };
        const result = config({}, overrides);
        expect(result.dts).toBe(false);
    });
  });
