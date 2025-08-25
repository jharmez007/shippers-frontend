import Api from "../api";

export const getFreightApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/nsc/mt-head/freights/reviewed",
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
      url: `/nsc/mt-head/freight/${body.id}/details`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};


export const submitFreight = async ({ id, reason }) => {
  try {
    const response = await Api({
      method: "post",
      url: `/nsc/mt-head/freight/${id}/review`,
      data: {
        action: "recommend",
        reason, // optional
      },
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message:
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error.message,
    };
  }
};

export const rejectFreight = async ({ id, reason }) => {
  try {
    const response = await Api({
      method: "post",
      url: `/nsc/mt-head/freight/${id}/review`,
      data: {
        action: "reject",
        reason,
      },
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message:
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error.message,
    };
  }
};

