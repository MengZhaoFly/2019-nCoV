/**
 * 数据总览
 */
import mongoose from 'mongoose';
import connection from '../util/db';
import { VariableKey, ModelCacheType } from '../types/types';



const Schema = mongoose.Schema;
const modelCache: ModelCacheType = {}
const schema = new Schema({
  inDate: Date,
  data: {}
});

export default function (modelName: VariableKey): mongoose.Model<any> | undefined {
  if (modelCache[modelName]) {
    return modelCache[modelName];
  } else {
    const model = connection.model(modelName, schema);
    modelCache[modelName] = model
    return model;
  }
}
export {
  modelCache
}
