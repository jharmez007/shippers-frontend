import Api from "../api";

export const getFreightApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/bank/freight-rate-applications",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getFreightDetails = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: `/bank/freight/${body.id}/details`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const reviewApplication = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: `/bank/freight-rate-applications/${body.id}/review`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};