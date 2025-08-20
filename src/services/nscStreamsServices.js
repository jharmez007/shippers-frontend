import Api from "../api";

export const getKPI = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/nsc/m_and_e/streams/kpi-reports",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getKPIReport = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url:  `/nsc/m_and_e/streams/kpi-reports/${body.id}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const confirmKPI = async (body) => {
  try {
    const response = await Api({
      method: "patch",
      url: `/nsc/m_and_e/streams/kpi-reports/${body.id}/status`,
      data: body.new_status ? { status: body.new_status } : {},
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getThroughput = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/nsc/m_and_e/streams/throughput-reports",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getThroughputReport = async (body) => {
  try {
    const response = await Api({
      method: "get",
      url:  `/nsc/m_and_e/streams/throughput-reports/${body.id}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const confirmThroughput = async (body) => {
  try {
    const response = await Api({
      method: "patch",
      url: `/nsc/m_and_e/streams/throughput-reports/${body.id}/status`,
      data: body.new_status ? { status: body.new_status } : {},
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};