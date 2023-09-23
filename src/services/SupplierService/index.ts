import { AxiosResponse } from "axios";
import httpClient from "../utils/httpClient";
import { GetSupplerByIdResponse, GetSuppliersResponse } from "./types";
import { SupplierFormType } from "@schemas/b4/suppliers";

class SupplierService {
  getSuppliers(): Promise<AxiosResponse<GetSuppliersResponse>> {
    return httpClient.get("/suppliers?page=1&limit=999");
  }

  deleteSupplier(id: string): Promise<AxiosResponse> {
    return httpClient.delete(`/suppliers/${id}`);
  }

  getSupplierById(id: string): Promise<AxiosResponse<GetSupplerByIdResponse>> {
    return httpClient.get(`/suppliers/${id}`);
  }

  createSupplier(data: SupplierFormType): Promise<AxiosResponse> {
    return httpClient.post("/suppliers", data);
  }

  editSupplier(id: string, data: SupplierFormType): Promise<AxiosResponse> {
    return httpClient.put(`/suppliers/${id}`, data);
  }
}

export default new SupplierService();
