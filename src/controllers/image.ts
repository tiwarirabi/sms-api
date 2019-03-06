import { Response, NextFunction } from 'express';
import config from '../config/config';
/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function upload(req: any, res: Response, next: NextFunction) {
  const filePath = req.files.file.path.replace('src/uploads/', '');

  const fullPath = `http://${config.app.host}:${
    config.app.port
  }/image/${filePath}`;

  res.json({ file: fullPath });
}

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetch(req: any, res: Response, next: NextFunction) {
  const { fileName } = req.params;

  const options = {
    root: __dirname + '/../uploads/',
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
