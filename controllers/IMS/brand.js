const BRANDS_REPO = require('../../repositories/brand');

module.exports = {
    getBrands
}

async function getBrands(req, res) {
  const name = req.query?.name;

  try {
    const brands = await BRANDS_REPO.getBrands(name);
    return res.json(brands);
  } catch (error) {
    debug(error);
    res.sendStatus(SERVER_STATUSES.SERVER_ERROR);
  }
}