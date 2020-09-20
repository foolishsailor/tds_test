const fetch = require("node-fetch");

const fetchCountry = async (code) => {
  const baseURL = process.env.API_COUNTRY_BASE_URL;
  try {
    const response = await fetch(`${baseURL}${code}?fields=name`);

    if (!response) throw { statusCode: 503, message: "Service Unavailable" };

    const result = await response.json();

    return result;
  } catch (error) {
    if (!response) throw { statusCode: 500, message: "Internal Server Error" };
  }
};

module.exports = async (arr) => {
  return await Promise.all(
    arr.map(async (item) => {
      const country = await fetchCountry(item.country);
      return { ...item, country: country.name };
    })
  );
};
