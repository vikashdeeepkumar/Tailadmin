
import Cookies from 'js-cookie';

export const setToken = (token: string): void => {
  Cookies.set('token', token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const getToken = (): string | null => {
  return Cookies.get('token') || null;
};

export const removeToken = (): void => {
  Cookies.remove('token');
};

export const authHeader = (): { Authorization?: string } => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};