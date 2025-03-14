import baseConfig from "./jest.config";

export default {
  ...baseConfig,
  testMatch: ["<rootDir>/tests/controllers/**/*.test.ts"],
};
