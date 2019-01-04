import Router from "koa-router";
import models from "../models";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Wxrefund.findOne({ where: ctx.query });
  await next();
});

router.post("/", async (ctx, next) => {
  const [data, isNewRecord] = await models.Wxrefund.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...data.toJSON(),
    ...data.get({ plain: true }),
    isNewRecord,
  };
  await next();
});

export default router;