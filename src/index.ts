import { mergeConfig } from 'tsdown';
import type {
    AttwOptions,
    TsdownInputOption,
    UserConfig,
    WithEnabled
 } from 'tsdown';

export interface Options {
    entry?: 'index' | 'srcDir' | 'srcRecursive' | Exclude<TsdownInputOption, string>;
    inlineDeps?: (string | RegExp)[];
    platform?: 'browser' | 'node' | 'neutral';
}

export function config(
    { entry = 'index', inlineDeps = [], platform = 'node' }: Options = {},
    overrides: UserConfig = {}
): UserConfig {
    return mergeConfig(
        {
            entry:
                entry === 'index' ? 'src/index.ts'
                : entry === 'srcDir' ? 'src/*.ts'
                : entry === 'srcRecursive' ? 'src/**/*.ts'
                : entry,
            // add `{ sourcemap: true }` rather than simply `true` to ensure declaration maps are generated
            dts: {
                sourcemap: true,
            },
            inlineOnly: inlineDeps,
            platform: platform,
            exports: true,
            attw: {
                enabled: 'ci-only',
                resolvePaths: [import.meta.dirname],
                profile: 'esm-only'
            } as WithEnabled<AttwOptions>,
        },
        overrides,

    )
};
