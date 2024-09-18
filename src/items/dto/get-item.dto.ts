export class GetItemDto {
  id: string;
  name_rus: string;
  name_eng: string;
  homebrew: boolean;
  price: string;
  source: string;
  weight?: string;
  description: string;
  categories: string[];
  icon?: string;
  world_id?: bigint;
}
