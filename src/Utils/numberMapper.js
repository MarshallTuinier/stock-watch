// This function will take a string input as an argument from the main App
// It will return a number based on the length of the string and the current days

const numberMapper = str => {
  if (str === 'last 30 days') {
    return Math.floor(30 / 7 * 5);
  }
  if (str === 'last 60 days') {
    return Math.floor(60 / 7 * 5);
  }
  if (str === 'last 90 days') {
    return Math.floor(90 / 7 * 5);
  }
  if (str === 'last 6 months') {
    return Math.floor(182 / 7 * 5);
  }
  if (str === 'last year') {
    return Math.floor(365 / 7 * 5);
  }
  if (str === 'last 5 years') {
    return Math.floor(1827 / 7 * 5);
  }
  if (str === 'last 10 years') {
    return Math.floor(3650 / 7 * 5);
  }
};

export { numberMapper };
