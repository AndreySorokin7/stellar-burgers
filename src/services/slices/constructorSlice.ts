import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

// Типизация состояния
export type ConstructorState = {
  bun: TIngredient | null;
  ingredients: Array<TIngredient & { id: string }>;
  orderRequest: boolean;
  orderError: string | null;
  orderNumber: number | null;
};

// Начальное состояние
const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderError: null,
  orderNumber: null
};

// Асинхронный санк для создания заказа
export const createOrder = createAsyncThunk(
  'constructor/createOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order.number;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка при создании заказа');
    }
  }
);

// Создание слайса
const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action) {
      return { ...state, bun: action.payload };
    },
    addIngredient(state, action) {
      // Проверяем, инициализирован ли массив ingredients
      const ingredients = Array.isArray(state.ingredients)
        ? state.ingredients
        : [];
      return {
        ...state,
        ingredients: [...ingredients, action.payload]
      };
    },
    removeIngredient(state, action) {
      // Проверяем, инициализирован ли массив ingredients
      if (!Array.isArray(state.ingredients)) {
        return state;
      }

      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, index) => index !== action.payload
        )
      };
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;

      // Проверяем, инициализирован ли массив ingredients
      if (!Array.isArray(state.ingredients)) {
        return state;
      }

      const newIngredients = [...state.ingredients];
      const [removed] = newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, removed);

      return { ...state, ingredients: newIngredients };
    },
    resetConstructor() {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => ({
        ...state,
        orderRequest: true,
        orderError: null
      }))
      .addCase(createOrder.fulfilled, (state, action) => ({
        ...state,
        orderRequest: false,
        orderNumber: action.payload
      }))
      .addCase(createOrder.rejected, (state, action) => ({
        ...state,
        orderRequest: false,
        orderError: action.payload as string
      }));
  }
});

// Экспорт экшенов
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

// Экспорт редьюсера
export default constructorSlice.reducer;
