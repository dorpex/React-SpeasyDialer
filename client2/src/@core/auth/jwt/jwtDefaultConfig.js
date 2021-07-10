// ** Auth Endpoints
const domain = location.host === 'localhost:3000' ? 'localhost:9000': `localhost:9000`
export default {
  loginEndpoint:  `http://${domain}/users/login/submit` ,
  registerEndpoint: `http://${domain}/users/register/submit`,
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
