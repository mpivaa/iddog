module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleNameMapper": {
    "@app/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1"
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}