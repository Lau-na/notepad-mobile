import { IconName } from "../components/Icon";
import { Entity } from "./entity";

export interface Category extends Entity {
  description: string;
  color: string;
  icon: IconName;
}
