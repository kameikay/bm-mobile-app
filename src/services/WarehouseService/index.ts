import { AxiosResponse } from "axios";
import httpClient from "../utils/httpClient";
import {
  CreateShelfResponse,
  CreateWarehouseResponse,
  GetWarehouseByIdResposne,
  ShelfResponse,
} from "./types";
import { WarehouseFormType } from "@schemas/b4/warehouses";

class WarehouseService {
  getWarehouseById(
    id: string
  ): Promise<AxiosResponse<GetWarehouseByIdResposne>> {
    return httpClient.get(`/warehouses/${id}`);
  }

  createWarehouse(
    data: WarehouseFormType
  ): Promise<AxiosResponse<CreateWarehouseResponse>> {
    return httpClient.post("/warehouses", data);
  }

  editWarehouse(id: string, data: WarehouseFormType): Promise<AxiosResponse> {
    return httpClient.put(`/warehouses/${id}`, data);
  }

  deleteWarehouse(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/warehouses/${id}`);
  }

  createShelf(
    warehouseId: string
  ): Promise<AxiosResponse<CreateShelfResponse>> {
    return httpClient.post(`/warehouses/${warehouseId}/shelf`);
  }

  deleteShelf(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/warehouses/shelf/${id}`);
  }

  createColumn(shelfId: string, name: string) {
    return httpClient.post(`/warehouses/shelf/${shelfId}/column`, {
      column_name: name,
    });
  }

  createRow(shelfId: string, name: string) {
    return httpClient.post(`/warehouses/shelf/${shelfId}/row`, {
      row_name: name,
    });
  }

  getShelfById(id: string): Promise<AxiosResponse<ShelfResponse>> {
    return httpClient.get(`/warehouses/shelf/${id}`);
  }

  editColumn(shelfId: string, columnId: string, name: string) {
    return httpClient.put(`/warehouses/shelf/${shelfId}/column/${columnId}`, {
      column_name: name,
    });
  }

  editRow(shelfId: string, rowId: string, name: string) {
    return httpClient.put(`/warehouses/shelf/${shelfId}/row/${rowId}`, {
      row_name: name,
    });
  }

  deleteColumn(shelfId: string, columnId: string): Promise<AxiosResponse> {
    return httpClient.delete(`/warehouses/shelf/${shelfId}/column/${columnId}`);
  }

  deleteRow(shelfId: string, rowId: string): Promise<AxiosResponse> {
    return httpClient.delete(`/warehouses/shelf/${shelfId}/row/${rowId}`);
  }
}

export default new WarehouseService();
