module.exports = {
    
    testEnvironment: "jest-environment-jsdom", 
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Point to setupTests.js in the same 'tests' folder
    testMatch: ["<rootDir>/*.test.tsx"], // Match all .test.tsx files directly in the 'tests' folder
    testPathIgnorePatterns: ["<rootDir>/node_modules/"], // Ignore node_modules inside the 'tests' folder
};

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
      },
      
  };
  