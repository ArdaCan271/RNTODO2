import axios from "axios";

export const fetchProducts = async () => {
  const apiUrl = "http://duyu.alter.net.tr/api/GetWarehousesStocks";

  const response = await axios.post(apiUrl, {
    token: 'RasyoIoToken2021',
    user_token: '$2y$10$3ZanqNP1F5b0RimSRtVeOrHvorDi0KHVfro0aM.KyMOrM36jjo7W',
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch products');
  }
  return response.data;

}