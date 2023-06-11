import { Category } from "./category";
import { Entity } from "./entity";

export interface Note extends Entity {
  title: string;
  text: string;
  date: Date;
  categoryId: number;
  category?: Category;
}
