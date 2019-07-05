# Coder Synth

A modular audio playground for the Web Audio API.

This playground has initially been created for a hands-on workshop. You may want to take a look at [the presentation slides](https://volcomix.github.io/music-synthesis-js).

## How to use this playground

* go in [this codesandbox](https://codesandbox.io/s/github/volcomix/coder-synth) right now
* or you can just try [the UI here](https://volcomix.github.io/coder-synth/Demo/Example).
* or `git clone` this repo and code in your favorite editor.


## Where goes your code

Add your songs in the `src/music/songs` directory.
> Don't forget to export them in `src/music/songs/index.js`

Then you can create new instruments in the `src/music/instruments` directory and use them as tracks in your song class.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Deploy to Github Pages
```
./deploy.sh
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
