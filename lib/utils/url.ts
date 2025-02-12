import { config } from "@/mock/config";

export function getThumbnailUrl(imageName: string) {
  return config.BASE_THUMBNAIL_URL + imageName;
}

export function getImageUrl(imageName: string) {
  return config.BASE_IMAGES_URL + imageName;
}
