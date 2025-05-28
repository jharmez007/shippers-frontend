import Api from "../api";

export const getProfile = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/auth/me",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const editSettings = async (body) => {
  try {
    const response = await Api({
      method: "put",
      url: "/auth/me",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};