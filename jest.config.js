export default {
  "preset": "ts-jest",
  "roots": [
    "<rootDir>/tests"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      "useESM": true,
      "tsconfig": "<rootDir>/tsconfig.json"
    }]
  }
}