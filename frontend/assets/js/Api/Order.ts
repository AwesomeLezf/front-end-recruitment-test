import { ApiInterface } from "../types/api";
import { SinglePurchaseData } from "../types/form";
import { Api } from "./Api";

const path = "order/";
export default {
  post(data: SinglePurchaseData) {
    return Api(<ApiInterface>{
      url: `${path}`,
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
