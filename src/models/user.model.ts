import { IUrl } from './url.model';

interface IUser {
  readonly id?: number;
  readonly email: string;
  readonly password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly urls?: IUrl[];
}

interface IPayload {
  readonly id: number;
  readonly iat: number;
  readonly exp: number;
}

interface IResponse extends Response {
  readonly redirect: any;
}

interface IRequest extends Request {
  readonly user: IUser;
}

interface IMessage {
  readonly message: string;
}

interface IAccessToken {
  readonly access_token: string;
}

export { IUser, IPayload, IResponse, IRequest, IMessage, IAccessToken };
