export async function getDefaultUserIcon(): Promise<string> {
  const response = await fetch('/userIcon.png');

  const blob = await response.blob();
  const base64Icon = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  return base64Icon as string;
}
