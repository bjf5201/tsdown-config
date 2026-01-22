import { mergeConfig } from 'tsdown';
import type {
    AttwOptions,
    TsdownInputOption,
    UserConfig,
    WithEnabled
 } from 'tsdown';

export interface Options {
    entry?: 'indexFile' | 'srcDir' | 'srcRecursive' | Exclude<TsdownInputOption, string>;
    inlineDeps?: (string | RegExp)[];
}

export function tsdownLib(
    { entry = 'indexFile', inlineDeps = [] }: Options = {},
    overrides: UserConfig = {}
): UserConfig {
    return mergeConfig(
        {
            entry:
                entry === 'indexFile' ? 'src/index.ts'
                : entry === 'srcDir' ? 'src/*.ts'
                : entry === 'srcRecursive' ? 'src/**/*.ts'
                : entry,
            // add `{ sourcemap: true }` rather than simply `true` to ensure declaration maps are generated
            dts: {
                sourcemap: true,
            },
            inlineOnly: inlineDeps,
            platform: 'neutral',
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

export function tsdownNodeLib(
    options: Options = {},
    overrides: UserConfig = {},
): UserConfig {
    return tsdownLib(options, {
        platform: 'node',
        ...overrides,
    })
};
