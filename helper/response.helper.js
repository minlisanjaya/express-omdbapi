function responseBadRequest(message) {
  return { httpCode: 400, error: { message } };
}

function responseInternalServerError() {
  return { httpCode: 500, error: { message: 'Internal Server Errror' } };
}

module.exports = { responseBadRequest, responseInternalServerError };
