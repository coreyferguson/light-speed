
# Config

Hierarchical configuration using [nconf](https://github.com/indexzero/nconf).

Order of precedence:

## 1. User overrides 

Located in `~/.light-speed/overrides.yml`

## 2. Environment variables

Set log level with environment variable.

```bash
export logLevel=debug
npm start
```

## 3. Arguments

```bash
npm start -- --logLevel=debug
```

## 4. Defaults

Located in [`./default-config.yml`](./default-config.yml).



