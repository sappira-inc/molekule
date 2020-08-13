# ⚛️ Molekule [![npm version](https://badge.fury.io/js/molekule.svg)](http://badge.fury.io/js/molekule) [![Build Status](https://travis-ci.org/heydoctor/molekule.svg?branch=main)](https://travis-ci.org/heydoctor/molekule) [![codecov](https://codecov.io/gh/heydoctor/molekule/branch/main/graph/badge.svg)](https://codecov.io/gh/heydoctor/molekule) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-:D-blue.svg?style="flats")](https://conventionalcommits.org)

> The last React component library you'll ever need

## Contributing

Check out the [projects](https://github.com/heydoctor/molekule/projects) to see if there are any outstanding components to be developed.

```sh
$ git clone git@github.com:sappira-inc/molekule.git
$ npm install
$ npm run docs
```

### Previewing

We use [Yalc](https://github.com/whitecolor/yalc) to preview changes made to Molekule in consuming applications.

1. Install Yalc: `yarn global add yalc`.
1. Run `yarn preview` to publish the changes to your local `~/.yalc` directory, and re-publish when changes are detected.
1. Run `yarn link molekule` or `yalc add molekule` in the consuming application. Both will replace the consuming application's node module with the yalc version, the latter will also update the consuming application's `package.json`.
1. Start (or restart) the consuming application to preview the changes locally (including on subsequent changes).
1. Once you're satisfied with your changes, run: `yalc remove molekule` in the consuming application to remove the yalc version, and `yarn install --check-files` to restore the package.

## Releasing

Release is now automatic! As soon as you merge your branch into main it will auto build and publish.

Keep in mind that to keep semantic versioning automated we must use conventional commits, eg:
- `fix:` for patch version bumps
- `feat:` for minor version bumps
- `BREAKING CHANGE:` for major version bumps, this is for non backwards compatible/breaking changes!
