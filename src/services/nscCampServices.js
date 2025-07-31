import Api from "../api";

export const flaggedContainers = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/camp/nsc/m_and_e/flagged-containers",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const reviewContainers = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: `/camp/nsc/m_and_e/flagged-container/${body.id}/review`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const contestContainers = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: `/camp/nsc/m_and_e/flagged-container/${body.id}/contest`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};