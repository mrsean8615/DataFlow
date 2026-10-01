const API_URL = process.env.EXPO_PUBLIC_LOCAL_API_URL;

export async function getTestData() {
  const response = await fetch(`${API_URL}/api/testAPI`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}
