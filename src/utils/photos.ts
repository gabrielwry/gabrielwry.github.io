export interface Photo {
  id: number;
  title: string;
  location: string;
  url: string;
  description: string;
  date: string;
  tags: string[];
}

// Import photos data
import photosData from '/data/photos/photos.json';

export function getAllPhotos(): Photo[] {
  return photosData as Photo[];
}

export function getPhotosByTag(tag: string): Photo[] {
  const photos = getAllPhotos();
  return photos.filter(photo => photo.tags.includes(tag));
}

export function getAllPhotoTags(): string[] {
  const photos = getAllPhotos();
  const tagSet = new Set<string>();
  
  photos.forEach(photo => {
    photo.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
