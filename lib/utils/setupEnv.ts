export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  } else {
    return process.env.API_BASE_URL || "http://localhost:3000";
  }
};
