import Api from "../api";

export const bankAcceptShippingLineRequest = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/bank/accept/shipping-line-request",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};