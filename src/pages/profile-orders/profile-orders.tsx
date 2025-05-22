import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) return <Preloader />;
  if (error)
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>
        Ошибка: {error}
      </div>
    );

  return <ProfileOrdersUI orders={orders} />;
};
