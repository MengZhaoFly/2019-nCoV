import mongoose from 'mongoose';

enum VariableKey {
  getStatisticsService =  'getStatisticsService',
  getListByCountryTypeService1 = 'getListByCountryTypeService1',
  getListByCountryTypeService2 = 'getListByCountryTypeService2',
  getTimelineService = 'getTimelineService',
  getIndexRumorList = 'getIndexRumorList',
  getIndexRecommendList = 'getIndexRecommendList',
  getWikiList = 'getWikiList'
}

interface ModelCacheType {
  getStatisticsService?: mongoose.Model<any>,
  getListByCountryTypeService1?: mongoose.Model<any>,
  getListByCountryTypeService2?: mongoose.Model<any>,
  getWikiList?: mongoose.Model<any>,
  getTimelineService?: mongoose.Model<any>,
  getIndexRumorList?: mongoose.Model<any>,
  getIndexRecommendList?: mongoose.Model<any>
}

interface JsonListObj {
  modelName: string,
  url: VariableKey
}
interface jsonListType {
  
}
const dataList: VariableKey[] = [
  VariableKey.getIndexRecommendList,
  VariableKey.getListByCountryTypeService1,
  VariableKey.getListByCountryTypeService2,
  VariableKey.getIndexRumorList,
  VariableKey.getStatisticsService,
  VariableKey.getTimelineService,
  VariableKey.getWikiList
] 
export {
  VariableKey,
  ModelCacheType,
  JsonListObj,
  dataList
}