import { jwtDecode } from 'jwt-decode';

/**
 * Decode JWT Token
 */
export const decodeJWT = (jwt: string) => {
  if (!jwt) return new Error('JWT Token not found. ');

  const decoded: any = jwtDecode(jwt);
  // Check if token is expired
  if (decoded?.exp < Date.now() / 1000) {
    throw new Error('JWT Token expired. Please login again! ');
  }

  // Check if token has user id
  // If yes, set userId and jwtToken
  if (decoded?.['https://hasura.io/jwt/claims']?.['x-hasura-user-id']) {
    return [decoded['https://hasura.io/jwt/claims']['x-hasura-user-id'], jwt];
  }

  throw new Error('User id not found in JWT Token');
};

