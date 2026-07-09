export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function filesToBase64(fileList: FileList | null): Promise<string[]> {
  if (!fileList || fileList.length === 0) return [];
  const files = Array.from(fileList);
  return Promise.all(files.map(fileToBase64));
}