import * as url from 'url';
import { Request } from 'express';

/**
 * Get full url of the request.
 *
 * @param {Request} req
 * @returns {string}
 */
export function getFullUrl(req: Request) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl + req.path
  });
}
