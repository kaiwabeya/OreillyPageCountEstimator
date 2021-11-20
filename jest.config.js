module.exports = {
    "testEnvironment": "<rootDir>/custom-test-env.js",
    "automock": false,
    "unmockedModulePathPatterns": ["<rootDir>/node_modules/*"],
    "moduleDirectories": ["node_modules"],
    "moduleFileExtensions": ["js", "jsx", "node"],
    "testMatch": ["**/__tests__/*.test.+(js|jsx)"],
    "collectCoverage": true
};

