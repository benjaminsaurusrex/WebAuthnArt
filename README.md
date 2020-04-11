![banner.png]()

# `WebAuthnArt`

> Have you ever wanted to create an entire universe of art and music from your hardware authentication token? Well you're in luck!

#### What the heck is this?

This is weekend project to finally make something useful out of my web authentication devices. I've always been interested in generating art/music and using a hardware authentication token seems like a decent instrument to do so.

Some technical notes:

- this is a [React](https://reactjs.org/) app
- this is an uninjected [`create-react-app`](https://github.com/facebook/create-react-app) project
- this is built using [Typescript](https://www.typescriptlang.org/)
- this is using [Tone.js](https://tonejs.github.io/) to turn code into sounds.
- this is using [d3.js](https://d3js.org/) to do some quantization math, so I don't have to.
- this is using an old-fashioned HTML5 `<canvas>` element to turn code into visual art.

## `v0.0.1`

This first implementation doesn't do anything particularly fancy. It just uses the hardware authentication device's signed challenge as PRNG seeds. Then it uses the PRNG function created from those seeds for everything else (generating a random scale for the music, generating random gradient colors, generating a random length of time to play the next tone for, etc).
