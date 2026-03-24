import Api from "../api";

export const getKPI = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/streams/terminal/kpi",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const submitKPI = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/streams/terminal/kpi",
      data: body
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
      url: `/streams/terminal/kpi/${body.id}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const getReportingOfficers = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/streams/terminal/reporting-officers",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const createReportingOfficer = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/streams/terminal/reporting-officers",
      data: body
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
      url: "/streams/terminal/throughput",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};

export const submitThroughput = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/streams/terminal/throughput",
      data: body
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
      url: `/streams/terminal/throughput/${body.id}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};
