import { Credentials } from "../types/credentials";
import { Service } from "./service";

class LoginService extends Service {
  async login(credentials: Credentials) {
    return await this.axios.post("/login", credentials);
  }
}

export default new LoginService();
