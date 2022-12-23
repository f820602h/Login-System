import { checkUserStatusMiddleware } from "./global";

const globalMiddleware = [checkUserStatusMiddleware];

export const pipelineGuard = (to, from, next) => {
  let index;
  const middlewareArray = to.matched.reduce((acc, route) => {
    return [...acc, ...route.meta.middleware];
  }, globalMiddleware);

  if (!middlewareArray.length) return next();

  function concatenatedMiddleware() {
    index = index !== undefined ? index + 1 : 0;
    const isLastMiddleware = index === middlewareArray.length - 1;
    const nextPipeline = isLastMiddleware
      ? () => next()
      : concatenatedMiddleware;
    middlewareArray[index](to, from, next, nextPipeline);
  }

  concatenatedMiddleware();
};
