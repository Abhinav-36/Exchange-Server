exports.getCurrencies = async (req, res) => {
  try {
    let url = "https://open.er-api.com/v6/latest";

    const response = await fetch(url);
    const data = await response.json();
    let curr = Object.keys(data.rates);
    res.send(curr);
  } catch (error) {
    res.status(500).json({
      message: "The service is currently down, please check again later",
    });
  }
};

exports.getConversion = async (req, res) => {
  // console.log(req.params);
  let { value, currency, to_currency } = req.query;
  // console.log(value, currency, to_currency);
  if (
    value == null ||
    currency == null ||
    to_currency == null ||
    value < 0 ||
    currency.length != 3 ||
    to_currency.length != 3 ||
    typeof currency !== "string" ||
    typeof to_currency !== "string"
  ) {
    return res
      .status(400)
      .json({ message: "Incorrect or Incomplete data passed" });
  }

  try {
    let url = `https://open.er-api.com/v6/latest/${currency}`;
    const response = await fetch(url);
    const data = await response.json();

    let currRate = data.rates[currency.toUpperCase()];
    let toCurrRate = data.rates[to_currency.toUpperCase()];

    if (!currRate || !toCurrRate) {
      return res.status(404).json({ message: "Cannot find given currency" });
    }

    let converted = value * toCurrRate;
    res.json({ result: converted });
  } catch (error) {
    res.status(500).json({
      message: "The service is currently down, please check again later",
    });
  }
};
