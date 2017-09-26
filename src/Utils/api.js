const fetchStockData = stockSymbol => {
  const API_KEY = '7Y3L79Z225PPUYF8';

  return fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${API_KEY}`
  )
    .then(res => res.json())
    .catch(err => {
      throw new Error(err.message);
    });
};

export { fetchStockData };
