import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type Membership = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  icon?: IconDefinition;
};