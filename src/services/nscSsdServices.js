import Api from "../api";

export const submitProposedStandard = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/nsc/ssd/proposed-standards",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const approveOrRejectProposed = async ({ id, action }) => {
  try {
    const response = await Api({
      method: "patch",
      url: `/nsc/ssd/proposed-standards/${id}/approve`,
        data: {
            action,
        },
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getApprovedStandards = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/nsc/ssd/approved-standards",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};


export const updateAverages = async ({standardId, payload}) => {
  try {
    const response = await Api({
      method: "patch",
      url: `/nsc/ssd/approved-standards/${standardId}/averages`,
      data: payload,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const updateNewAverages = async (payload) => {
  try {
    const response = await Api({
      method: "post",
      url: `/nsc/ssd/approved-standards/averages`,
      data: payload,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getProposedStandards = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/nsc/ssd/proposed-standards",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};