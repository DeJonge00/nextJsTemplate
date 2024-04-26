import '@testing-library/jest-dom';

jest.resetAllMocks();
jest.useFakeTimers().setSystemTime(new Date('2024-01-01').getTime());
jest.setTimeout(3_000);
