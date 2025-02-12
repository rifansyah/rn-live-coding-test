import { BOOKING_CATEGORIES_PLACEHOLDER } from "@/mock/category_samples";

export function getCategory(id: number) {
  return BOOKING_CATEGORIES_PLACEHOLDER.find((item) => item.id === id);
}
