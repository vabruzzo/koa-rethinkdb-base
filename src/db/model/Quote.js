const Quote = {};

Quote.all = async r => {
  try {
    return await r.table('quotes').run();
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

Quote.get = async (r, id) => {
  try {
    return await r
      .table('quotes')
      .get(id)
      .run();
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

Quote.create = async (r, quote) => {
  try {
    const response = await r
      .table('quotes')
      .insert(quote, { returnChanges: true })
      .run();
    if (response.changes.length) {
      return response.changes[0].new_val;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

Quote.update = async (r, id, quote) => {
  try {
    const response = await r
      .table('quotes')
      .get(id)
      .update(quote, { returnChanges: true })
      .run();
    if (response.changes.length) {
      return response.changes[0].new_val;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

Quote.delete = async (r, id) => {
  try {
    const response = await r
      .table('quotes')
      .get(id)
      .delete({ returnChanges: true })
      .run();
    if (response.changes.length) {
      return response.changes[0].old_val;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

module.exports = Quote;
