'use strict';

module.exports = {
  collectCoverageFrom: ['src/components/**/*.js', '!src/components/**/*-story.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  setupFiles: ['<rootDir>/config/jest/setup.js'],
  testMatch: ['<rootDir>/**/__tests__/**/*.js?(x)', '<rootDir>/**/?(*-)(test).js?(x)'],
  testURL: 'http://localhost',
  testPathIgnorePatterns: ['/node_modules/', '/config/', '/lib/', '/es/'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
