# cloud-music-react

## Add husky & commitlint configuration

```sh
# Install Husky v6
npm install husky --save-dev
# or
yarn add husky --dev

# Activate hooks
npx husky install
# or
yarn husky install

# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Add hook
npm pkg set scripts.prepare="husky install"
npm run prepare
npx husky add .husky/pre-commit 'npm run lint & npm run lint:css'
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.cjs

## Add conventional-changelog configuration

```sh
npm install conventional-changelog-cli commitizen cz-conventional-changelog standard-version --save-dev

# or add commitizen to global
npm install commitizen -g

# Config commitizen
commitizen init cz-conventional-changelog --save-dev --save-exact

# or add .czrc file to root directory
echo "{ \"path\": \"cz-conventional-changelog\" }" > .czrc

git add .
git cz
```

## Add eslint & prettier configuration

```sh
npm install @rushstack/eslint-patch @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-config-react-app eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier --save-dev

npm pkg set scripts.lint="eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --no-fix --ignore-path .eslintignore"
```

## Add stylelint configuration

```sh
npm install sass stylelint stylelint-config-prettier-scss stylelint-config-standard stylelint-config-standard-scss stylelint-declaration-block-no-ignored-properties --save-dev

npm pkg set scripts.lint:css="stylelint \"src/**/*.{scss,css,sass}\" --no-fix"
```

## Add vscode settings in .vscode/settings.json

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
    "source.sortImports": true
  },
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
  ],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.alwaysShowStatus": true,
  "stylelint.validate": [
    "css",
    "less",
    "postcss",
    "scss",
    "vue",
    "sass",
  ]
}
```
