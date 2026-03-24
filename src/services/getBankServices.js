import Api from "../api";

export const shipperBanks = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/shipper/banks",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};