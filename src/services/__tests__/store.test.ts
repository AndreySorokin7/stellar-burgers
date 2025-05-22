import { configureStore } from '@reduxjs/toolkit';
import constructorReducer, {
  resetConstructor as resetConstructorAction
} from '../slices/constructorSlice';
import ingredientsReducer, {
  fetchIngredients
} from '../slices/ingredientsSlice';
import userReducer from '../slices/userSlice';
import feedReducer from '../slices/feedSlice';
import ordersReducer from '../slices/ordersSlice';

describe('Проверка initialState rootReducer', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
        feed: feedReducer,
        user: userReducer,
        constructor: constructorReducer,
        orders: ordersReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false
        })
    });
  });

  it('должен инициализировать все слайсы с начальными значениями', () => {
    const state = store.getState() as any;

    // Проверяем слайс ingredients
    expect(state.ingredients.items).toEqual([]);
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.error).toBeNull();

    // Проверяем, что все нужные слайсы присутствуют в сторе
    expect(Object.keys(state)).toEqual([
      'ingredients',
      'feed',
      'user',
      'constructor',
      'orders'
    ]);
  });

  it('должен корректно обрабатывать экшены из разных слайсов', () => {
    // Отправляем экшен для начала загрузки ингредиентов
    store.dispatch(fetchIngredients.pending('', undefined));

    // Проверяем, что состояние ingredients обновилось
    const state1 = store.getState() as any;
    expect(state1.ingredients.loading).toBe(true);
    expect(state1.ingredients.error).toBeNull();

    // Отправляем экшен для сброса конструктора
    store.dispatch(resetConstructorAction());

    // Проверяем состояние после обоих экшенов
    const state2 = store.getState() as any;
    expect(state2.ingredients.loading).toBe(true); // Не изменилось
  });
});
