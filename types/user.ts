import { Entity } from "./entity";
import { Note } from "./note";
import { Category } from "./category";

export interface User extends Entity {
  username: string;
  password: string;
  note: Note;
  category: Category;
}
