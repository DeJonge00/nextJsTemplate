/* eslint-disable */
export default {
    displayName: 'utils',
    preset: '../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/utils',
    setupFilesAfterEnv: ['../../jest.setup.ts', './jest.setup.ts'],
};
