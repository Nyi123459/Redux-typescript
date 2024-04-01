<<<<<<< HEAD
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
=======
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Change test environment to jest-environment-jsdom
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.scss$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
>>>>>>> 0c132a48311b8ba37c35262ba66d97f84d53c8dd
  },
};
