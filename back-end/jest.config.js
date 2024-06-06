/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.(ts|js)", "**/?(*.)+(spec|test).(ts|js)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/modules/**/*.{ts,tsx}",
    "!src/modules/**/dto/*.{ts,tsx}",
    "!src/modules/**/vo/*.{ts,tsx}",
  ],
};
