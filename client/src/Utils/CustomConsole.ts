import { environment } from '@Environment';

export default (data: any): void => {
  if (environment === 'development') {
    console.log(data);
  }
};
