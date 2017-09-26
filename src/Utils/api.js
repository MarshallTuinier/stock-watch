const fetchStockData = stockSymbol => {
  const API_KEY = '7Y3L79Z225PPUYF8';

  return fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${API_KEY}`
  )
    .then(res => res.json())
    .catch(err => {
      console.log('There was an error');
      throw new Error('Higher-level error. ' + err.message);
    });
};

export { fetchStockData };
