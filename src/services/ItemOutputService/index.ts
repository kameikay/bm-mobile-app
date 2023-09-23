import { AxiosResponse } from "axios";
import httpClient from "../utils/httpClient";
import { GetItemOutputByIdResponse, GetItemOutputsResponse } from "./types";
import { ItemOutputFormType } from "@schemas/b4/item_outputs";

class ItemOutputService {
  getItemOutputs(): Promise<AxiosResponse<GetItemOutputsResponse>> {
    return httpClient.get("/item_outputs?page=1&limit=999");
  }

  deleteItemOutput(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/item_outputs/${id}`);
  }

  getItemOutputById(
    id: string
  ): Promise<AxiosResponse<GetItemOutputByIdResponse>> {
    return httpClient.get(`/item_outputs/${id}`);
  }

  createItemOutput(data: ItemOutputFormType): Promise<AxiosResponse> {
    return httpClient.post("/item_outputs", data);
  }

  editItemOutput(id: string, data: ItemOutputFormType): Promise<AxiosResponse> {
    return httpClient.put(`/item_outputs/${id}`, data);
  }
}

export default new ItemOutputService();
