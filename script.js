var btc = document.getElementById("btc");
var eth = document.getElementById("eth");
var doge = document.getElementById("doge");

var setting = {
  async: true,
  crossDomain: true,
  url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
  method: "GET",
  headers: {},
};
$.ajax(setting).done(function (response) {
  btc.innerHTML = response.bitcoin.usd;
  eth.innerHTML = response.ethereum.usd;
  doge.innerHTML = response.dogecoin.usd;
  console.log(btc, eth, doge);
});
