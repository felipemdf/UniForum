import Http from './http.js'

/**
 * @type Api
 */
export default class Api extends Http {
  /**
   * @type {String}
   */
  static base = '/api/v1'

  /**
   * @param {String} path
   * @param {Object} options
   * @param {Object} http
   * @return {this}
   */
  static build (path = '', options = {}, http = null) {
    return new this(Api.normalize(Api.base, path), options, http)
  }
}