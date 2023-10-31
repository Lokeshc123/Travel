var tt_cc = document.getElementById("total_cc");
var tt_ex = document.getElementById("total_ex");
var tt_mc = document.getElementById("total_mc");
var tt_24h = document.getElementById("total_24h");
var tt_ccc = document.getElementById("total_ccx");
var tt_mt = document.getElementById("total_mrkt");
const settings = {
  async: true,
  crossDomain: true,
  url: "https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  tt_cc.innerHTML = response.data.totalCoins;
  tt_ex.innerHTML = response.data.totalExchanges;
  tt_mc.innerHTML = response.data.totalMarketCap;
  tt_24h.innerHTML = response.data.total24hVolume;
  tt_ccc.innerHTML = response.data.totalCoins;
  tt_mt.innerHTML = response.data.totalMarkets;
  console.log(tcc, tex, tmc);
});
const settings1 = {
  async: true,
  crossDomain: true,
  url: "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=10&offset=0",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

$.ajax(settings1).done(function (response) {
  const coins = response.data.coins; // Assuming 'coins' contains an array of coin objects
  console.log(coins);
  // Assuming you have an HTML element with id 'coinContainer' to display the coins
  const coinContainer = document.getElementById("meow");

  coins.forEach((coin) => {
    // Creating a div element for each coin
    const coinDiv = document.createElement("div");
    coinDiv.classList.add("coin-item"); // You can define CSS for this class

    // Creating HTML content for the coin view
    coinDiv.innerHTML = `
    <img src="${coin.iconUrl}" />
      <h2>${coin.name}</h2>
      <p>Symbol: ${coin.symbol}</p>
      <p>Market Cap: ${coin.marketCap}</p>
      <p>Price: ${coin.price}</p>
      <!-- Add other relevant information here -->
    `;

    // Appending the coin's div to the container
    coinContainer.appendChild(coinDiv);
  });
});
