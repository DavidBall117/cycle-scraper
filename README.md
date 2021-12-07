# cycle-scraper

## Overview

TODO

## Getting Started

TODO

## Commands

TODO

## Setting Up TypeScript

Reference: (https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)[https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript]

1. Install TypeScript dependencies: `yarn add -D typescript`
2. Install TypeScript linting: `yarn add -D tslint`
3. Create a tsconfig.json file in the root directory and populate with:

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

4. Create a tslint.json file in the root directory and populate with:

```
{
  "defaultSeverity": "error",
  "extends": ["tslint:recommended"],
  "jsRules": {},
  "rules": {
    "no-console": false
  },
  "rulesDirectory": []
}
```

5. Add the following to the package.json scripts object:
   `"start": "tsc && node dist/app.js"`
6. Create the src/app.ts directory/file at the root of the project for the entry point.
7. (optional) Add Run the commands `yarn add -D ts-node` and `yarn add -D nodemon`. Add the following command to the package.json scripts:
   `"dev": "nodemon src/app.ts",`
8. (optional) Add prettier to project for code formatting. Run the commands: `yarn add -D prettier` and `yarn add -D tslint-config-prettier`. Add the following to the tslint.json file:

```
"extends": [
  "tslint:recommended",
  "tslint-config-prettier"
],
```

Add the following commands to the package.json scripts:

```
"format": "prettier --write 'src/**/*.ts'",
"conflict-check": "tslint-config-prettier-check ./tslint.json"
```
