import { EditPersonalDataFormType } from "@schemas/configs/editPersonalData";
import httpClient from "../utils/httpClient";
import { ChangePasswordFormType } from "@schemas/configs/changePasswordFormSchema";
import { AccountFormType } from "@schemas/configs/accountFormSchema";
import { AxiosResponse } from "axios";
import { MeResponse } from "./types";

class UserService {
  editPersonalData(data: EditPersonalDataFormType) {
    return httpClient.put("/users/me", data);
  }

  changePassword(data: ChangePasswordFormType) {
    return httpClient.put("/users/change-password", data);
  }

  getPersonalData(): Promise<AxiosResponse<MeResponse>> {
    return httpClient.get("/users/me");
  }

  createUserByAdmin(data: AccountFormType) {
    return httpClient.post("/users", data);
  }

  editUserByAdmin(userId: string, data: AccountFormType) {
    return httpClient.put(`/users/${userId}`, data);
  }

  deleteUser(userId: string) {
    return httpClient.delete(`/users/${userId}`);
  }

  authorizeUser(userId: string) {
    return httpClient.put(`/users/authorize/${userId}`);
  }
}

export default new UserService();
