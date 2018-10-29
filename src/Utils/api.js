const fetchStockData = async stockSymbol => {
  const API_KEY = "7Y3L79Z225PPUYF8";
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${API_KEY}`
    );
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchStockData };
