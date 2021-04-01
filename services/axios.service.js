const axios = require('axios');
const LogRequestModel = require('../models/log.request.model');
const { responseInternalServerError } = require('../helper/response.helper');

class AxiosService {
  constructor(config = {}) {
    this.axios = axios.create(config);
    this.logRequestModel = new LogRequestModel();
  }

  responseHandler(response, url) {
    let result = null;
    if (response.data) {
      result = {
        httpCode: response.status,
        data: response.data,
      };
    }

    if (response.response) {
      result = {
        httpCode: response.response.status,
        error: response.response.data,
      };
    }

    if (result) {
      return result;
    }

    return responseInternalServerError();
  }

  async logRequest(url, data) {
    const paramsLog = {
      url: this.axios.defaults.baseURL + url,
      parameters: JSON.stringify(data),
      called_at: new Date(),
    };

    return this.logRequestModel.createLogRequest(paramsLog);
  }

  async get(url, params, headers = {}) {
    const config = {
      params,
      headers,
    };

    try {
      // intentionally no await
      this.logRequest(url, params);
      const response = await this.axios.get(url, config);

      return this.responseHandler(response, url);
    } catch (error) {
      return this.responseHandler(error, url);
    }
  }
}

module.exports = AxiosService;
