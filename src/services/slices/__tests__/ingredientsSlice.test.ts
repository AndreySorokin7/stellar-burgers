import reducer, {
  fetchIngredients,
  IngredientsState
} from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

// Константы для часто используемых значений и селекторов в тестах
const EMPTY_ARRAY: TIngredient[] = [];
const ACTION_TYPE_EMPTY = '';
const LOADING_TRUE = true;
const LOADING_FALSE = false;
const ERROR_NULL = null;

const initialState: IngredientsState = {
  items: EMPTY_ARRAY,
  loading: LOADING_FALSE,
  error: ERROR_NULL
};

const mockIngredients: TIngredient[] = [
  {
    _id: 'ingredient-id-1',
    name: 'Ингредиент 1',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'ingredient1.png',
    image_mobile: 'ingredient1-mobile.png',
    image_large: 'ingredient1-large.png'
  },
  {
    _id: 'ingredient-id-2',
    name: 'Ингредиент 2',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'ingredient2.png',
    image_mobile: 'ingredient2-mobile.png',
    image_large: 'ingredient2-large.png'
  }
];

describe('ingredientsSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: ACTION_TYPE_EMPTY })).toEqual(initialState);
  });

  describe('fetchIngredients', () => {
    it('должен установить loading=true при pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(LOADING_TRUE);
      expect(state.error).toBe(ERROR_NULL);
    });

    it('должен загрузить ингредиенты при fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(LOADING_FALSE);
      expect(state.items).toEqual(mockIngredients);
      expect(state.error).toBe(ERROR_NULL);
    });

    it('должен установить error при rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(LOADING_FALSE);
      expect(state.items).toEqual(EMPTY_ARRAY);
      expect(state.error).toBe(errorMessage);
    });
  });
});
