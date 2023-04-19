import { Entity } from "./entity";
import { Category } from "./category";

export interface Note extends Entity {
  title: string;
  text: string;
  date: Date;
  category: Category;
}
