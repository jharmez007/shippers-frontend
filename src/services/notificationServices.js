import Api from "../api";

export const adminNotifications = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/admin/admin/notifications",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};