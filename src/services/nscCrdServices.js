import Api from "../api";

export const getFreightApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/nsc/mandt/freight/pending",
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
      url: `/nsc/mandt/freight/${body.id}/details`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const attendFreight = async ({ id, action }) => {
  try {
    const response = await Api({
      method: "post",
      url: `/nsc/mandt/freight/${id}/attend`,
      data: {
        action, 
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


export const submitFreight = async ({ id, rppu, reason }) => {
  try {
    const response = await Api({
      method: "post",
      url: `/nsc/mandt/freight/${id}/review`,
      data: {
        action: "submit_to_head",
        rppu,
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
      url: `/nsc/mandt/freight/${id}/review`,
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

