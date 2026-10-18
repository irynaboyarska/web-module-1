const { validationProblem } = require("../utils/api-errors");

function errorMiddleware(error, req, res, next) {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res
      .status(400)
      .json(
        validationProblem("Invalid JSON body", [
          "Request body must contain valid JSON",
        ]),
      );
  }

  console.error(error);

  return res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Unexpected server error",
    },
  });
}

module.exports = { errorMiddleware };
