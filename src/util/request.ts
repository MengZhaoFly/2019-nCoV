import request from 'request';

function req(url: string, option: request.CoreOptions) {
  return new Promise((resolve: (res: any) => void, reject) => {
    request(url, option, (err, res, body: any) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(body)
      }
    })
  })
}
export default req;