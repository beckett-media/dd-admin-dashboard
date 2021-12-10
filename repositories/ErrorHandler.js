class ErrorHandler {
  getError(error) {
    if (error.response) {
      if (error?.response?.data?.data?.errorMessage) {
        return `${error.response.data?.data?.errorMessage}`;
      } else if (error?.response?.data?.message) {
        return `${error.response?.data?.message}`;
      }
    } else if (error.request) {
    } else {
      return `${error}`;
    }
  }
}

export default ErrorHandler;
