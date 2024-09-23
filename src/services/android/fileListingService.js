import { Media } from "@capacitor-community/media";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// Function to fetch albums
export const fetchAlbums = async () => {
  try {
    const { albums } = await Media.getAlbums();
    return albums;
  } catch (e) {
    console.error("Error fetching albums:", e);
    return [];
  }
};

const mediaExtensions = {
  image: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".svg", ".webp"],
  audio: [".mp3", ".wav", ".aac", ".flac", ".ogg"],
  video: [
    ".mp4",
    ".avi",
    ".mkv",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".mpeg",
    ".mpg",
    ".3gp",
    ".ogv",
  ],
};

export const readAllFiles = async (albums) => {
  try {
    const allFiles = {
      images: [],
      audios: [],
      videos: [],
    };

    for (const album of albums) {
      const dirPath = album.identifier;
      const result = await Filesystem.readdir({ path: dirPath });

      result.files.forEach((obj) => {
        const fileName = obj.name.toLowerCase();
        if (obj.type === "file") {
          if (mediaExtensions.audio.some((ext) => fileName.endsWith(ext))) {
            allFiles.audios.push(obj);
          } else if (
            mediaExtensions.image.some((ext) => fileName.endsWith(ext))
          ) {
            allFiles.images.push(obj);
          } else if (
            mediaExtensions.video.some((ext) => fileName.endsWith(ext))
          ) {
            allFiles.videos.push(obj);
          }
        }
      });
    }

    return allFiles;
  } catch (e) {
    console.error("Error reading files:", e);
    return { images: [], audios: [], videos: [] };
  }
};

export const writeAllFilesToJsonFile = async (allFiles, fileName) => {
  try {
    const jsonString = JSON.stringify(allFiles);
    await Filesystem.writeFile({
      path: fileName,
      data: jsonString,
      directory: Directory.ExternalStorage,
      encoding: Encoding.UTF8,
    });
    console.log(`File ${fileName} written successfully.`);
  } catch (error) {
    console.error(`Error writing file ${fileName}:`, error);
  }
};
