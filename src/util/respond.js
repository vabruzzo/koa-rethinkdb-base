module.exports = ctx => {
  ctx.body = {
    status: 'success',
    data: ctx._locals,
  };
};
