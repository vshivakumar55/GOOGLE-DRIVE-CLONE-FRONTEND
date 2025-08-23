// frontend/src/API/backend.ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function uploadToBackend(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${apiUrl}/files/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file to backend");
  }

  return res.json();
}
