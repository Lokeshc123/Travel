$(document).ready(function () {
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
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function () {
      const searchText = searchInput.value.toLowerCase();

      const coin = response.data.coins.find(function (coin) {
        return coin.name.toLowerCase() === searchText;
      });

      if (coin) {
        const timeFrameButtons = document.querySelectorAll(".btn-time-frame");

        timeFrameButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const timeFrame = this.id; // Get the ID of the clicked button

            const uuid = coin.uuid;

            const settings1 = {
              async: true,
              crossDomain: true,
              url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeFrame}`,
              method: "GET",
              headers: {
                "X-RapidAPI-Key":
                  "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
                "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
              },
            };

            $.ajax(settings1).done(function (response) {
              const data_history = response.data.history.map(function (item) {
                return {
                  timestamp: item.timestamp,
                  price: item.price,
                };
              });

              createChart(data_history); // Call the function to create the chart here
            });
          });
        });
      } else {
        window.alert("No coin found with that name");
      }
    });
  });

  let myChart = null; // Initialize a variable to hold the chart instance

  function createChart(data) {
    const ctx = document.getElementById("myChart").getContext("2d");

    // Check if myChart already exists, destroy it before creating a new chart
    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item.timestamp),
        datasets: [
          {
            label: "Price",
            data: data.map((item) => item.price),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                suggestedMin: Math.min(...data.map((item) => item.price)) - 10,
              },
            },
          ],
        },
      },
    });
  }
});
