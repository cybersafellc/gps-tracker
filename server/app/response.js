class Response {
  constructor(status, message, data, refrence, error) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.refrence = refrence;
    this.error = error;
  }
}

export { Response };
