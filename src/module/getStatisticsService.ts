import Koa = require('koa');
import Router = require('koa-router');
import query from '../util/query';
import { modelCache } from '../model/model'

module.exports = async (ctx: Koa.BaseContext, next: Koa.Middleware) => {
  const body = await query(modelCache.getStatisticsService);
  ctx.body = body;
}