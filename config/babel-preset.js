'use strict';

const { BABEL_ENV } = process.env;

module.exports = {
  presets: [
    [
      'env',
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['last 1 versions', 'Firefox ESR'],
        },
      },
    ],
  ],
};
