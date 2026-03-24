import Api from '../api';

export const getNewAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token'); // Retrieve the refresh token
    const response = await Api({
      method: 'post',
      url: '/auth/refresh', 
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};