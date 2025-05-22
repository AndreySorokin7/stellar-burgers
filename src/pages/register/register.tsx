import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    console.log('Attempting registration with:', { email, name: userName });

    dispatch(registerUser({ email, password, name: userName }))
      .unwrap()
      .then((userData) => {
        console.log('Registration successful:', userData);
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        console.error('Registration error:', err);
        setError(err);
      });
  };

  return (
    <RegisterUI
      errorText={error?.message || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
