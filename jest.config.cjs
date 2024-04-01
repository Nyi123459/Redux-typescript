// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
  },
};
