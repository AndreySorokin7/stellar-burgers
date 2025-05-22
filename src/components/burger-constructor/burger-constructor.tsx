import { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  createOrder,
  resetConstructor
} from '../../services/slices/constructorSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const { bun, ingredients, orderRequest, orderNumber, orderError } =
    useSelector((state) => state.constructor);
  const { user, isAuthChecked } = useSelector((state) => state.user);

  // Закрываем модальное окно при возникновении ошибки
  useEffect(() => {
    if (orderError) {
      setModalOpen(false);
      alert(`Ошибка при создании заказа: ${orderError}`);
    }
  }, [orderError]);

  // Создаем объект с ингредиентами для конструктора
  const constructorItems = useMemo(
    () => ({
      bun: bun || undefined,
      ingredients: Array.isArray(ingredients) ? ingredients : []
    }),
    [bun, ingredients]
  );

  // Рассчитываем общую стоимость
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0),
    [constructorItems]
  );

  // Создаем данные для модального окна заказа
  const orderData = useMemo(
    () => (orderNumber ? ({ number: orderNumber } as TOrder) : null),
    [orderNumber]
  );

  // Обработчик клика по кнопке "Оформить заказ"
  const onOrderClick = useCallback(() => {
    // Проверки на наличие ингредиентов
    if (!constructorItems.bun) {
      alert('Пожалуйста, добавьте булку для бургера');
      return;
    }

    if (constructorItems.ingredients.length === 0) {
      alert('Пожалуйста, добавьте начинку для бургера');
      return;
    }

    if (orderRequest) {
      return; // Уже идет запрос, не делаем ничего
    }

    // Проверка авторизации
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    // Собираем массив ID ингредиентов
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    // Отправляем заказ
    dispatch(createOrder(ingredientIds));
    // Открываем модальное окно
    setModalOpen(true);
  }, [constructorItems, dispatch, navigate, orderRequest, user, location]);

  // Закрытие модального окна
  const closeOrderModal = useCallback(() => {
    setModalOpen(false);
    if (orderNumber) {
      // Сбрасываем состояние конструктора после успешного заказа
      dispatch(resetConstructor());
    }
  }, [dispatch, orderNumber]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={modalOpen ? orderData : null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
