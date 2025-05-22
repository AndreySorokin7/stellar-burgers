import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  // Получаем id ингредиента из параметров URL
  const { id } = useParams<{ id: string }>();

  // Получаем все ингредиенты из стора
  const { items } = useSelector((state) => state.ingredients);

  // Находим нужный ингредиент по id
  const ingredientData = items.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
