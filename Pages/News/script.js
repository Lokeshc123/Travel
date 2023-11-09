$(document).ready(function () {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw",
    method: "GET",
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    const contentDiv = $(".content"); // Select the content div

    response.value.forEach(function (article) {
      const imageUrl = article.image?.thumbnail?.contentUrl;
      const headline = article.name;
      const articleUrl = article.url;

      const div = $("<div>").addClass("article");

      if (imageUrl) {
        div.css("background-image", `url(${imageUrl})`);
      } else {
        div.css("background-color", "#f0f0f0"); // Fallback color
      }

      const h2 = $("<h2>").text(headline);

      div.append(h2);
      contentDiv.append(div); // Append article div to the content div
      div.click(function () {
        if (articleUrl) {
          window.open(articleUrl, "_blank"); // Open URL in a new tab
        }
      });
    });
  });
});
