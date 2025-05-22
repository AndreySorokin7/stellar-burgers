import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || ''
    });
  }, [user]);

  const isFormChanged =
    isEditing &&
    (formValue.name !== user?.name || formValue.email !== user?.email);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(updateUser(formValue));
      setIsEditing(false);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      isEditing={isEditing}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      startEditing={startEditing}
      updateUserError={error || undefined}
    />
  );
};
