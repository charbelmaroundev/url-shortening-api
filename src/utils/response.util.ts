import { IRes } from '../models/shared.model';

const response = (message: string, statusCode: number, data?: Object): IRes => {
  return { message, statusCode, data };
};

export { response };
