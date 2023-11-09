const settings = {
  async: true,
  crossDomain: true,
  url: "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  // Assuming response.data contains an array of cryptocurrencies
  const cryptocurrencies = response.data.coins;

  // Assuming the table body has the ID "crypto-table-body"
  const tableBody = $("#crypto-table-body");

  // Loop through the cryptocurrency data and create table rows
  cryptocurrencies.forEach((crypto) => {
    const row = `<tr>
    
        <td><img src="${crypto.iconUrl}" alt="${crypto.name} icon" width="20" height="20"></td>
        <td>${crypto.name}</td>
        <td>${crypto.symbol}</td>
        <td>$ ${crypto.price}</td>
        <td>${crypto.marketCap}</td>
        <td>${crypto.change}</td>
      </tr>`;

    // Append the row to the table body
    tableBody.append(row);
  });
});
