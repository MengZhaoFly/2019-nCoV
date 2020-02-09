import jsdom from "jsdom";
import dayJS from 'dayjs';
import request from './request';
import modelCreate from '../model/model';
import { VariableKey, JsonListObj } from '../types/types';

const { JSDOM } = jsdom;

// 四个基本的数据 无分页
const dataLists: VariableKey[] = [
  VariableKey.getStatisticsService,
  VariableKey.getListByCountryTypeService1,
  VariableKey.getListByCountryTypeService2,
  VariableKey.getWikiList
]
/** 
 * 长列表 有分页
 * 0: 辟谣与防护
 * 1: 防护知识合辑
 * 3: 实时播报
 */


const jsonList = [
  {
    modelName: VariableKey.getIndexRumorList,
    url: 'https://file1.dxycdn.com/2020/0130/454/3393874921745912507-115.json?t=26343751'
  },
  {
    modelName: VariableKey.getIndexRecommendList,
    url: 'https://file1.dxycdn.com/2020/0130/542/3393874921746319236-115.json?t=26342815'
  },
  {
    modelName: VariableKey.getTimelineService,
    url: 'https://file1.dxycdn.com/2020/0130/492/3393874921745912795-115.json?t=26342813'
  }
]
function modelCreateByData(modelName: VariableKey, data: object): void {
  const model = modelCreate(modelName);
  const inDate = dayJS().format('YYYY-MM-DD HH:mm:ss')
  if (model) {
    model.create({ inDate: inDate, data: data })
  }
}
async function crawler(): Promise<void> {
  try {
    console.log('正在访问 dxy');
    const html: string = await request('https://ncov.dxy.cn/ncovh5/view/pneumonia', {})
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const window = (dom.window as any)
    dataLists.map((modelName) => {
      modelCreateByData(modelName, window[modelName]);
    })
    for (let urlObj of jsonList) {
      const jsonListObj = urlObj;
      const data = await request(jsonListObj.url, { json: true })
      const modelName: VariableKey = jsonListObj.modelName
      modelCreateByData(modelName, data.data);
    }
  } catch (error) {

  }
}
function run(): void {
  crawler();
  setInterval(() => {
    crawler();
  }, 1000 * 60 * 30)
}
export {
  run
}