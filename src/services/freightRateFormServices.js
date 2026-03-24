import Api from "../api";

export const shipperFreighRateForm = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/shipper/freight-rate-form",
      data: body,
       headers: {
        "Content-Type": "application/json",
      }
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};