export function generateUsername(fullName) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const namePart = fullName
    .toLowerCase()
    .replace(/\s+/g, "") // Remove spaces
    .slice(0, 4); // Take the first 4 characters of the name
  let randomPart = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars[randomIndex];
  }

  return namePart + randomPart;
}
