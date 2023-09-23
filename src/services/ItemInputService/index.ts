import { AxiosResponse } from "axios";
import httpClient from "../utils/httpClient";
import { GetItemInputByIdResponse, GetItemInputsResponse } from "./types";
import { ItemInputFormType } from "@schemas/b4/item_inputs";

class ItemInputService {
  getItemInputs(): Promise<AxiosResponse<GetItemInputsResponse>> {
    return httpClient.get("/item_inputs");
  }

  deleteItemInput(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/item_inputs/${id}`);
  }

  getItemInputById(
    id: string
  ): Promise<AxiosResponse<GetItemInputByIdResponse>> {
    return httpClient.get(`/item_inputs/${id}`);
  }

  createItemInput(data: ItemInputFormType): Promise<AxiosResponse> {
    return httpClient.post("/item_inputs", data);
  }

  editItemInput(id: string, data: ItemInputFormType): Promise<AxiosResponse> {
    return httpClient.put(`/item_inputs/${id}`, data);
  }
}

export default new ItemInputService();
