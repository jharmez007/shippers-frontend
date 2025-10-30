import Api from "../api";

export const getTerminals = async ({ port_complex }) => {
  try {
    const response = await Api({
      method: "get",
      url: `/common/terminals?port_complex=${encodeURIComponent(port_complex)}`,
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};


export const getPortComplex = async () => {
  try {
    const response = await Api({
      method: "get",
      url: "/common/port-complexes",
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};