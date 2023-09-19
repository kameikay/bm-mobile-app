import { AxiosResponse } from "axios";
import httpClient from "../utils/httpClient";
import {
  GetItemClassificationByIdResponse,
  GetItemClassificationsResponse,
} from "./types";
import { ItemClassificationFormType } from "@schemas/b4/item_classifications";

class ItemClassificationService {
  getItemClassifications(): Promise<
    AxiosResponse<GetItemClassificationsResponse>
    > {
    return httpClient.get("/item_classifications?page=1&limit=999");
  }

  deleteItemClassification(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/item_classifications/${id}`);
  }

  getItemClassificationById(
    id: string
  ): Promise<AxiosResponse<GetItemClassificationByIdResponse>> {
    return httpClient.get(`/item_classifications/${id}`);
  }

  createItemClassification(
    data: ItemClassificationFormType
  ): Promise<AxiosResponse<{ data: { id: string } }>> {
    return httpClient.post("/item_classifications", data);
  }

  editItemClassification(
    id: string,
    data: ItemClassificationFormType
  ): Promise<AxiosResponse> {
    return httpClient.put(`/item_classifications/${id}`, data);
  }

  createItemSubclassification(
    idItemClassification: string,
    name: string
  ): Promise<AxiosResponse> {
    return httpClient.post(
      `/item_classifications/${idItemClassification}/subclassification`,
      { name }
    );
  }

  editItemSubclassification(
    idItemClassification: string,
    idItemSubclassification: string,
    name: string
  ): Promise<AxiosResponse> {
    return httpClient.put(
      `/item_classifications/${idItemClassification}/subclassification/${idItemSubclassification}`,
      { name }
    );
  }

  deleteItemSubclassification(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/item_classifications/subclassification/${id}`);
  }
}

export default new ItemClassificationService();
