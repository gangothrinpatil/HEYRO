const imageModules = import.meta.glob<{ default: string }>('../assets/ASSETS/*.jpg', { eager: true });

const projectThumbnails: Record<string, string> = {};

for (const path in imageModules) {
  const filename = path.split('/').pop();
  if (filename) {
    const id = filename.replace('.jpg', '');
    projectThumbnails[id] = imageModules[path].default;
  }
}

export default projectThumbnails;
