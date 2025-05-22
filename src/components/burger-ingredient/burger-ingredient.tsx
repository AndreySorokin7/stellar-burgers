import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { addIngredient, setBun } from '../../services/slices/constructorSlice';
import { v4 as uuidv4 } from 'uuid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

// Компонент ингредиента бургера
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    // Обработчик клика по кнопке "Добавить"
    const handleAdd = () => {
      // Добавляем уникальный id для отслеживания в конструкторе
      const ingredientWithId = {
        ...ingredient,
        id: uuidv4()
      };

      // Если это булка - используем setBun, иначе - addIngredient
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredientWithId));
      } else {
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
