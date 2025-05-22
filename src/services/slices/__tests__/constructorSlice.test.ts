import reducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  createOrder,
  ConstructorState
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

// Моковые данные для тестов
const mockBun: TIngredient = {
  _id: 'bun-id',
  name: 'Булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'bun.png',
  image_mobile: 'bun-mobile.png',
  image_large: 'bun-large.png'
};

const mockIngredient: TIngredient & { id: string } = {
  _id: 'ingredient-id',
  id: 'unique-id-1',
  name: 'Ингредиент',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'ingredient.png',
  image_mobile: 'ingredient-mobile.png',
  image_large: 'ingredient-large.png'
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderError: null,
  orderNumber: null
};

describe('constructorSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен добавить булку', () => {
    const newState = reducer(initialState, setBun(mockBun));
    expect(newState.bun).toEqual(mockBun);
  });

  it('должен добавить ингредиент', () => {
    const newState = reducer(initialState, addIngredient(mockIngredient));
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(mockIngredient);
  });

  it('должен удалить ингредиент по индексу', () => {
    // Сначала добавляем ингредиент
    const stateWithIngredient = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    // Затем удаляем его
    const newState = reducer(stateWithIngredient, removeIngredient(0));
    expect(newState.ingredients).toHaveLength(0);
  });

  it('должен перемещать ингредиенты', () => {
    // Добавляем два ингредиента
    const mockIngredient2 = { ...mockIngredient, id: 'unique-id-2' };
    let state = reducer(initialState, addIngredient(mockIngredient));
    state = reducer(state, addIngredient(mockIngredient2));

    // Перемещаем ингредиенты
    const newState = reducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );

    expect(newState.ingredients[0]).toEqual(mockIngredient2);
    expect(newState.ingredients[1]).toEqual(mockIngredient);
  });

  it('должен сбрасывать состояние конструктора', () => {
    // Сначала добавляем булку и ингредиент
    let state = reducer(initialState, setBun(mockBun));
    state = reducer(state, addIngredient(mockIngredient));

    // Затем сбрасываем состояние
    const newState = reducer(state, resetConstructor());

    expect(newState).toEqual(initialState);
  });

  // Тесты для асинхронных экшенов
  describe('createOrder', () => {
    it('должен установить orderRequest=true при pending', () => {
      const action = { type: createOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.orderError).toBeNull();
    });

    it('должен установить номер заказа при fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: 12345
      };
      const state = reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderNumber).toBe(12345);
    });

    it('должен установить orderError при rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        payload: 'Ошибка при создании заказа'
      };
      const state = reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderError).toBe('Ошибка при создании заказа');
    });
  });
});
