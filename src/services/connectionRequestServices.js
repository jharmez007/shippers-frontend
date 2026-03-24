import Api from "../api";

export const fetchPendingConnections = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/bank/pending-requests",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const fetchConnectedShippers = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/bank/connected-users",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const fetchConnectedShippingLines = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/bank/pending-requests",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const fetchConnectedVesselChaterer = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url: "/bank/pending-requests",
      data: body,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};