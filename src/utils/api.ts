import {
  IAuthTokens,
  TokenRefreshRequest,
  applyAuthTokenInterceptor,
} from "axios-jwt";
import axios from "axios";

const BASE_URL = "https://taskg.herokuapp.com/api";

export const request = axios.create({ baseURL: BASE_URL });

const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  const response = await axios.post(`${BASE_URL}/token/refresh/`, {
    refresh: refreshToken,
  });
  return response.data.access;
};

applyAuthTokenInterceptor(request, { requestRefresh });
// or
// applyAuthTokenInterceptor(request, {
//     requestRefresh,  // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
//     header: "Authorization",  // header name
//     headerPrefix: "Bearer ",  // header value prefix
//   })
