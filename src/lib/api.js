
export async function getUsers() {
  const response = await fetch('https://www.bitstamp.net/api/v2/trading-pairs-info/');
  return response.json();
}
