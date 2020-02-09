import mongoose from 'mongoose';

export default async function query(model: mongoose.Model<any> | undefined) {
  return new Promise((resolve, reject) => {
    if (!model) return Promise.resolve({ msg: '暂无数据' });
    model
    .find({})
    .sort({ _id:-1 })
    .limit(1)
    .exec((err: any, docs: mongoose.Document) => {
      if (err) {
        console.log('查询出错了', err)
        reject(err);
      }
      console.log('查询结果', docs);
      resolve(docs);
    })
  })
}