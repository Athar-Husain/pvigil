export const BASE_API_URL = "http://localhost:9000";
// export const BASE_API_URL = "https://nekaaramitra-backend-api-url.onrender.com";

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};
export const REQ_ORDER_API_URL = `${BASE_API_URL}/api/orders`;

export const SUG_API_URL = `${BASE_API_URL}/api/requests`;
export const COMPLAINT_API = `${BASE_API_URL}/api/complaints/`;
