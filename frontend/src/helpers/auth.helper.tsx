// helpers/auth.helper.jsx
import Cookies from 'js-cookie';


export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    Cookies.set('token', token, {
      expires: 1 / 24, 
      
    });
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return Cookies.get('token') || null;
  }
  return null;
};


export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    Cookies.remove('token');
  }
};


export const authHeader = (): { 
  Authorization?: string; 
  'ngrok-skip-browser-warning'?: string 
} => {
  const token = getToken();
  const headers: any = {};
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // Always include ngrok-skip-browser-warning
  headers['ngrok-skip-browser-warning'] = 'true';
  
  return headers;
};