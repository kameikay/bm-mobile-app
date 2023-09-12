import { SignUpFormType } from "@schemas/auth/signup";
import httpClient from "../utils/httpClient";
import { ResetPassword } from "@schemas/auth/resetPassword";

class AuthService {
  login(cpf: string, password: string) {
    return httpClient.post("/signin", {
      cpf,
      password,
    });
  }

  register(data: SignUpFormType) {
    return httpClient.post("/signup", data);
  }

  confirmAccount(code: number, email: string) {
    return httpClient.post("/active", { code, email });
  }

  resendEmail(email: string) {
    return httpClient.put("/resend-email", { email });
  }

  sendEmailForgotPassword(email: string) {
    return httpClient.post("/forgot-password", { email });
  }

  resetPassword(data: ResetPassword) {
    return httpClient.post("/reset-password", { data });
  }
}

export default new AuthService();
