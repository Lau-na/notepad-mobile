import { User } from "../types/user";
import { CrudService } from "./service";

export default new CrudService<User>("users");
