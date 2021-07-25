import { randomBytes } from 'crypto';
import { diskStorage, Options } from 'multer';
import { resolve } from 'path';
import AppError from '../errors/AppError';

const uploadDest = resolve(__dirname, '..', '..', 'uploads');

const multerConfig: Options = {
  dest: uploadDest,
  storage: diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadDest);
    },

    filename: (req, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename);
        }

        const extension = file.mimetype.replace('image/', '');

        const filename = `${hash.toString('hex')}.${extension}`;

        callback(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, callback) => {
    const formats = ['image/png', 'image/jpeg', 'image/jpg'];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Format not accepted'));
    }
  },
};

export default multerConfig;
