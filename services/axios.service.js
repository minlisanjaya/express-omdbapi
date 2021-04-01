const axios = require('axios');
const LogRequestModel = require('../models/log.request.model');
const { responseInternalServerError } = require('../helper/response.helper');

class AxiosService {
  constructor(config = {}) {
    this.axios = axios.create(config);
    this.logRequestModel = new LogRequestModel();
  }

  responseHandler(response) {
    if (response.data) {
      return {
        httpCode: response.status,
        data: response.data,
      };
    }

    return responseInternalServerError();
  }

  async logRequest(url, data) {
    const paramsLog = {
      url: this.axios.defaults.baseURL + url,
      parameters: JSON.stringify(data),
      called_at: new Date(),
    };

    return this.logRequestModel.CreateLogRequest(paramsLog);
  }

  async Get(url, params = {}, headers = {}) {
    const config = {
      params,
      headers,
    };

    try {
      // intentionally no await
      this.logRequest(url, params);
      const response = await this.axios.get(url, config);

      return this.responseHandler(response);
    } catch (error) {
      return this.responseHandler(error, url);
    }
  }
}

module.exports = AxiosService;
