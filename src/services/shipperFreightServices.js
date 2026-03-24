import Api from "../api";

export const getFreightApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/shipper/freight-applications",
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
      url: `/shipper/freight/${body.id}/details`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

