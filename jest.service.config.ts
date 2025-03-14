import baseConfig from "./jest.config";

export default {
  ...baseConfig,
  // Colocar quando for usar o mock
  setupFilesAfterEnv: ["<rootDir>/tests/config/prisma.mock.ts"],
  testsMatch: ["<rootDir>/tests/services/**/*.spec.ts"],
};
