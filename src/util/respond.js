module.exports = ctx => {
  ctx.body = {
    status: 'success',
    data: ctx.state.data,
  };
};
