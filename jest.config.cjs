module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Change test environment to jest-environment-jsdom
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.scss$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
