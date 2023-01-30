export default {
  "preset": "ts-jest",
  "roots": [
    "<rootDir>/tests"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      "useESM": true,
      "tsconfig": "<rootDir>/tsconfig.json"
    }]
  }
}