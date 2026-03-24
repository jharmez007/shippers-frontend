import Api from "../api";

export const getChartererApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/charterer/freight-applications",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getChartererDetails = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: `/charterer/freight/${body.id}/details`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const charterApplications = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/charterer/freight-rate-application",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const charterForm = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/charterer/freight-rate-form",
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

// post audit

export const getPostAuditApplications = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/charterer/post-audit-requests",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const postAuditApplications = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/charterer/post-audit-request",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getPostAuditDetails = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: `/charterer/post-audit-requests/${body.id}`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};


export const postAuditForm = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/charterer/freight-rate-form",
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