import Api from "../api";

export const forgotPassword = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/auth/request-password-reset",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};