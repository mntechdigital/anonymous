/* eslint-disable @typescript-eslint/no-explicit-any */

export const pageUserLogin = async (
  data: any,
  endpoint?: string
): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/user-auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error in pageUserLogin:", error);
    throw error;
  }
};
