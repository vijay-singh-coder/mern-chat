import toast from 'react-hot-toast';
export function withErrorLogging(fn) {
  return function (...args) {
    try {
      const result = fn(...args);
      if (result && typeof result.then === "function") {
        return result.catch((error) => {
          if (
            error?.response &&
            error?.response?.data &&
            error?.response?.data?.errMessage
          ) {
            const errorMessage = error.response.data.errMessage;
            console.error("❌ API Error:", errorMessage);
            toast.error(`API Error: ${errorMessage}`); // Show toast for API error
          } else if (error.message) {
            console.error("❌ Error:", error.message);
            toast.error(`Error: ${error.message}`); // Show toast for general error
          } else {
            console.error("❌ Unknown Error:", error);
            toast.error("An unknown error occurred."); // Show toast for unknown error
          }
          throw error;
        });
      }

      return result;
    } catch (error) {
      console.error("❌ Sync Error:", error.message);
      toast.error(`Error: ${error.message}`); // Show toast for synchronous error
      throw error;
    }
  };
}