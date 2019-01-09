import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  const { page_num = 1, page_size = 10, sorter, ...where } = ctx.query;
  let order = [];
  if (Array.isArray(sorter)) {
    order = [...sorter.map(item => item.split("__"))];
  } else if (sorter) {
    order = [sorter.split("__")];
  }
  ctx.body = await models.Pay.findAndCountAll({
    where,
    offset: (page_num - 1) * page_size,
    limit: page_size,
    order,
  });
  await next();
});

router.get("/:id", async (ctx, next) => {
  ctx.body = await models.Pay.findById(ctx.params.id);
  await next();
});

router.post("/", async (ctx, next) => {
  ctx.body = await models.Pay.create(ctx.request.body);
  await next();
});

router.post("/multiple", async (ctx, next) => {
  ctx.body = await models.Pay.bulkCreate(ctx.request.body);
  await next();
});

router.patch("/", async (ctx, next) => {
  ctx.body = await models.Pay.update(ctx.request.body.fields, {
    where: ctx.request.body.filter,
  });
  await next();
});

router.patch("/:id", async (ctx, next) => {
  const obj = await models.Pay.findById(ctx.params.id);
  ctx.body = await obj.update(ctx.request.body);
  await next();
});

router.delete("/", async (ctx, next) => {
  ctx.body = await models.Pay.destroy({
    where: ctx.request.body,
  });
  await next();
});

router.delete("/:id", async (ctx, next) => {
  const obj = await models.Pay.findById(ctx.params.id);
  ctx.body = await obj.destroy();
  await next();
});

export default router;
