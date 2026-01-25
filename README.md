# @bjf5201/tsdown-config

My custom, opinonated config functions to be used with the [`tsdown` build tool](https://tsdown.dev)

## config()

Basic library configurations; the function has three optional parameters for the configs which most often differ from project to project: entry, inlineOnly (dependencies to inline with bundle), and platform ('node' | 'browser' | 'neutral'). Note that for the `platform` param, `node` also refers to Node-like environments such as `bun`.
