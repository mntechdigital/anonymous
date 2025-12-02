// Helper function to get cookie on client-side
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  
  return value || null;
}

export default getCookie;