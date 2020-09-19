module.exports = {
  setupFiles: ["dotenv/config"],
  verbose: true,
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
};
