export const safeApiCall = async <T>(apiCall: () => Promise<T>) => {
  try {
    return await apiCall();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
