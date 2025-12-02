import Api from "../api";

export const flaggedContainers = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/streams/terminal/flagged-containers",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getflaggedContainers = async (containerNo) => {
  try {
    const response = await Api({
      method: "get",
      url: `/streams/terminal/status/${containerNo}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getContainerStatus = async (containerNo) => {
  try {
    const response = await Api({
      method: "get",
      url: `/common/status/${containerNo}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};



