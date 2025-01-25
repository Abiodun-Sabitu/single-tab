/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest", // Use ts-jest to process TypeScript files
  testEnvironment: "jest-environment-jsdom", // Simulates a browser environment for React components
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Supported extensions
  testMatch: ["<rootDir>/tests/**/*.(test|spec).(ts|tsx)"], // Match test files
  collectCoverage: true, // Generate test coverage reports
  coverageDirectory: "coverage", // Directory for coverage reports
  coverageReporters: ["text", "lcov"], // Text output and lcov for IDEs
};

module.exports = config;
