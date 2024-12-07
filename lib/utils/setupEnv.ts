export const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return "http://localhost:3000";
  } else {
    return "https://recipe-for-disaster-liart.vercel.app";
  }
};
