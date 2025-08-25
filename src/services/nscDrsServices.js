import Api from "../api";

export const getFreightApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/drs/freight/recommended",
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
      url: `/drs/freight/${body.id}/details`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const downloadLetter = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: `/drs/freight/${body.id}/letter`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};


export const submitFreight = async ({ id, rppu, reason }) => {
  try {
    const response = await Api({
      method: "post",
      url: `/drs/freight/${id}/approve`,
      data: {
        action: "approve",
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
      url: `/drs/freight/${id}/approve`,
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

