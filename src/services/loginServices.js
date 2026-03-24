import Api from "../api";

export const login = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/auth/login",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};