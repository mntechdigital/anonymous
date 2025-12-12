/* eslint-disable @typescript-eslint/no-explicit-any */

export const post = async (data: any): Promise<any> => {
  try {
    // Check if data is FormData (when sending files)
    const isFormData = data instanceof FormData;

    const res = await fetch(`http://localhost:5000/api/v1/post/create-post`, {
      method: "POST",
      ...(isFormData
        ? {}
        : { headers: { "Content-Type": "application/json" } }),
      body: isFormData ? data : JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error in Post:", error);
    throw error;
  }
};
