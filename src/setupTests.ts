import '@testing-library/jest-dom';

// Мокаем модуль react-intersection-observer для тестов
jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn().mockImplementation(() => [jest.fn(), true])
}));

// Мокаем объект fetch
global.fetch = jest.fn();
