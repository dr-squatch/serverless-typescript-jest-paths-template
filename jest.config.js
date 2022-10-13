const { pathsToModuleNameMapper } = require('ts-jest');
const { join } = require('path');
// eslint-disable-next-line import/extensions
const { compilerOptions } = require('./tsconfig.paths.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: [
    '<rootDir>',
  ],
  resetMocks: true,
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: join(__dirname, 'tsconfig.json'),
    }],
  },
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
