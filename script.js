const newCards = [];
const populate = async () => {
  const requestUrl = "./data.json";
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const cards = await response.json();

  newCards.push(...cards);
  createCards(cards, "weekly");
};
const createCards = (obj, timeframe) => {
  const child = document.querySelector(".child2");
  let generatedCard = "";
  obj.forEach((card) => {
    generatedCard += `<div class="cards" style="
      background-color: ${card.bgColor};
        background-image: url(./images/icon-${card.title}.svg);
        ">
        <div class="content">
          <div class="content-heading">
            <p>${card.title}</p>
            <img src="./images/icon-ellipsis.svg" alt="" />
          </div>
          <div class="info">
            <h2>${card.timeframes[timeframe].current}hrs</h2>
            <p>${
              timeframe === "daily"
                ? "Yesterday"
                : "Last " + timeframe.slice(0, -2)
            } - ${card.timeframes[timeframe].previous}hrs</p>
          </div>
        </div>
      </div>
      `;
  });

  child.innerHTML = generatedCard;
};

populate();

daily = document.querySelector("#daily");
weekly = document.querySelector("#weekly");
monthly = document.querySelector("#monthly");

daily.addEventListener("click", () => {
  createCards(newCards, "daily");
});

weekly.addEventListener("click", () => {
  createCards(newCards, "weekly");
});

monthly.addEventListener("click", () => {
  createCards(newCards, "monthly");
});

const categories = document.querySelectorAll("li");

categories.forEach((e) => {
  e.addEventListener("click", (event) => {
    categories.forEach((category) => {
      if (category === event.target) {
        category.classList.add("selected");
      } else {
        category.classList.remove("selected");
      }
    });
  });
});
