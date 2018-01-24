# Carbon addon for live component demo

**React component library for live component demo**

This repository provides a collection of [React](https://facebook.github.io/react/) components, based on [Carbon Components](https://github.com/carbon-design-system/carbon-components), to be used in its live component demo.

## Usage

### Getting Started

```sh
> npm install -S carbon-components carbon-components-react carbon-addons-cloud carbon-icons classnames markdown-it react react-copy-to-clipboard react-dom react-ga
```

1. These components require the use of a module bundler, e.g. [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your project. See our [`webpack.config.js`](/.storybook/webpack.config.js) for an example configuration.

2. Components do not import any of the styles themselves, use your Sass tool to bring in `src/components/**/*.scss`.

## Development

Please refer to the [Contribution Guidelines](CONTRIBUTING.md) before starting any work.

### Using the server

We recommend the use of [React Storybook](https://github.com/storybooks/react-storybook) for developing components.

1. Start the server:

	```
	$ npm run storybook
	```

2. Open browser to `http://localhost:9000/`.

3. Develop components in their respective folders (`carbon-addons-design-system-website/src/components`).

4. Write stories for your components (`carbon-addons-design-system-website/src/components/**/*-story.js`).

## Contributing

Please check out our [Contribution Guidelines](docs/contributing.md) for detailed information on how you can lend a hand.
