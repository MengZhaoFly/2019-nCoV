import Koa from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import { run } from './util/schedule';
import { dataList } from './types/types'
import query from './util/query';
import modelCreate from './model/model';


const packageJSON = require('../package.json')

const app: Koa = new Koa();
const router: Router = new Router();

app.use(async (ctx: Koa.BaseContext, next: Koa.Next) => {
  ctx.set({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': ctx.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  });
  await next();
})

run();


dataList.forEach(key => {
  const { modelCache }  = require('./model/model');
  router.get(`/${key}`, async (ctx) => {
    const model = modelCreate(key)
    const body = await query(model);
    ctx.body = body;
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods());
  
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`${packageJSON.name} is running ${port} port ....`);
})