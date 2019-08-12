# ⚛️ Molekule [![npm version](https://badge.fury.io/js/molekule.svg)](http://badge.fury.io/js/molekule) [![Build Status](https://travis-ci.org/heydoctor/molekule.svg?branch=master)](https://travis-ci.org/heydoctor/molekule) [![codecov](https://codecov.io/gh/heydoctor/molekule/branch/master/graph/badge.svg)](https://codecov.io/gh/heydoctor/molekule) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-:D-blue.svg?style="flats")](https://conventionalcommits.org)

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
1. Run `yarn preview` (which runs `yalc push && nodemon -x 'yalc push --changed'`) to publish the changes to your local `~/.yalc` directory, and re-publish when changes are detected.
1. Run `yalc link molekule` in the consuming application, and start (or restart) that application to preview the changes locally.
1. Once you're satisfied with your changes, run: `yalc remove molekule` to remove the local version from the consuming application, and `yarn install --check-files` to restore the package.

## Releasing

```
$ npm run release
$ git push --follow-tags
$ npm publish
```
