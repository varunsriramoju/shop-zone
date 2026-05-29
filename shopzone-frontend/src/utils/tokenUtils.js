import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return { ...decoded, token };
  } catch {
    return null;
  }
};
