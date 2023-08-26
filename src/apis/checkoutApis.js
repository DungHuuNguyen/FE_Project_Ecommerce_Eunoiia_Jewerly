import axios from "axios";

export const checkoutApis = {
  getAllCheckoutBills: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}checkoutBills`,
      {
        params: params,
      }
    );
    return response.data;
  },

  addBill: async (bill) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_URL}checkoutBills`,
      bill
    );
    return response.data;
  },
};
