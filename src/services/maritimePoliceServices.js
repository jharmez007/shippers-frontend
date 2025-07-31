import Api from "../api";

export const flagContainer = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/camp/police/flag-container",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const flaggedContainers = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/camp/police/flagged-containers",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const releaseContainer = async (body) => {
  try {
    const response = await Api({
      method: "patch",
      url: `/camp/police/respond-contested/${body.id}`,
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};