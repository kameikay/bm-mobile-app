import { AxiosResponse } from "axios";
import httpClient from "../utils/httpClient";
import {
  GetItemByIdResponse,
  GetItemByNameResponse,
  ListItemsResponse,
} from "./types";
import { ItemFormType } from "@schemas/b4/items";

class ItemService {
  getItems(): Promise<AxiosResponse<ListItemsResponse>> {
    return httpClient.get("/items?page=1&limit=999");
  }

  deleteItem(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/items/${id}`);
  }

  getItemById(id: string): Promise<AxiosResponse<GetItemByIdResponse>> {
    return httpClient.get(`/items/${id}`);
  }

  createItem(data: ItemFormType): Promise<AxiosResponse> {
    return httpClient.post("/items", data);
  }

  editItem(id: string, data: ItemFormType): Promise<AxiosResponse> {
    return httpClient.put(`/items/${id}`, data);
  }

  getItemsByName(name: string): Promise<AxiosResponse<GetItemByNameResponse>> {
    return httpClient.get(`/items/name?name=${name}`);
  }
}

export default new ItemService();
