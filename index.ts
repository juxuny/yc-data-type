import request from 'umi-request';
import { StorageKey, LocalStorage } from './storage';
import { message } from 'antd';
import { UUID } from 'uuid-generator-ts';
import {BaseResp} from "./typing";

const uuid = new UUID();

const genReqId = () => {
  return uuid.getDashFreeUUID();
};

request.use(async (ctx, next) => {
  await next();
  if (ctx.res.code !== 0) {
    message.error(ctx.res.msg);
    return;
  }
});

export function doRequest<Type>(path: string, options?: { [key: string]: any }) {
  let token = LocalStorage.getItem(StorageKey.TOKEN);
  return request<BaseResp<Type>>(path, {
    headers: {
      'X-Rpc-Token': token || '',
      'Client-Request-Id': genReqId(),
    },
    errorHandler: (error) => {
      if (error.response.status === 504) {
        message.error('Gateway Timeout');
      } else {
        message.error(error.data?.msg);
      }
    },
    ...(options || {}),
  });
}
