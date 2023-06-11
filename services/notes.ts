import { Note } from "../types/note";
import { CrudService } from "./service";

export default new CrudService<Note>("notes");
