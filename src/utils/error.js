class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  /*
  console.log("******** ERROR ******");
  console.log("STATUSCODE", statusCode);
  console.log("MESSAGE", message);
  console.log("******** ERROR END ******");
  */
  res.statusMessage = JSON.stringify(message);

  res.status(statusCode).send();
};

module.exports = {
  ErrorHandler,
  handleError,
};
