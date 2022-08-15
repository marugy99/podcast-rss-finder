const { Client } = require("podcast-api");

export default function handler(req, res) {
  const client = Client({
    apiKey: null,
  });

  //"q" below should contain the user query from front-end
  client     
    .search({ q: req.query.q })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log("apiError: " + error);
    });
}