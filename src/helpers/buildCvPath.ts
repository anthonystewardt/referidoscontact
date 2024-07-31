export const buildCvPath = (path: string) => {
  // path is "public\assets\dnipdf.pdf" delete the "public\" and replace the "\" with "/"
  const newPath = path.replace("public\\", "").replace(/\\/g, "/");
  const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/admin$/, "") || ""; // Remove "/admin" suffix if exists
  return `${baseUrl}/${newPath}`;
};
