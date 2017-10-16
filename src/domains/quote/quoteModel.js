const Quote = {};

Quote.all = async r => {
  return await r.table('quotes').run();
};

Quote.get = async (r, id) => {
  return await r
    .table('quotes')
    .get(id)
    .run();
};

Quote.create = async (r, quote) => {
  const response = await r
    .table('quotes')
    .insert(quote, { returnChanges: true })
    .run();

  return response.changes.length && response.changes[0].new_val;
};

Quote.update = async (r, id, quote) => {
  const response = await r
    .table('quotes')
    .get(id)
    .update(quote, { returnChanges: true })
    .run();

  return response.changes.length && response.changes[0].new_val;
};

Quote.delete = async (r, id) => {
  const response = await r
    .table('quotes')
    .get(id)
    .delete({ returnChanges: true })
    .run();

  return response.changes.length && response.changes[0].old_val;
};

module.exports = Quote;
