import { Response, NextFunction } from 'express';
import config from '../config/config';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function upload(req: any, res: Response, next: NextFunction) {
  const filePath = req.files.file.path.replace(config.app.uploadDir, '');

  const fullPath = `http://${config.app.host}:${
    config.app.port
  }/image/${filePath}`;

  res.json({ file: fullPath });
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetch(req: any, res: Response, next: NextFunction) {
  const { fileName } = req.params;

  const options = {
    root: `${__dirname}/../../${config.app.uploadDir}/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile(fileName, options, (err: any) => {
    if (err) {
      next(err);
    } else {
      // console.log('Sent:', fileName);
    }
  });
}
