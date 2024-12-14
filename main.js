import { movies } from "./movies.js";

const cardRow = document.querySelector("#cardRow");
const categoryLinks = document.querySelectorAll(".category");
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#btn');
const sort1 = document.querySelector("#sort1");
const sort2 = document.querySelector("#sort2");

function renderCard(filterCard = movies) {
  cardRow.innerHTML = "";
  if (filterCard.length === 0) {
    cardRow.innerHTML = '<p class="text-white text-center">Результаты не найдены</p>';
    return;
  }

  filterCard.forEach((item) => {
    const cardMovie = document.createElement("div");
    cardMovie.innerHTML = `
      <div class="max-w-[244px] bg-[#333333] p-4 text-white text-center rounded-xl h-[400px]">
          <img src="${item.image || './deadpool.png'}" alt="${item.Title}" onerror="this.src='./deadpool.png'">
          <p class="pt-[20px] text-[20px]">${item.Title}</p>
          <div class="flex justify-center gap-[30px]">
              <p>${item.imdb_rating}</p>
              <p>${item.movie_year}</p>
              <p>${item.runtime} минут</p>
          </div>
          <div class="w-full">
              <p class="pb-[10px] w-[200px]">${item.Categories?.replace(/\|/g, " ") || "No Categories"}</p>
          </div>
          <button class="bg-[#5CB85C] p-2 rounded-xl">Подробнее</button>
      </div>
    `;
    cardRow.append(cardMovie);
  });
}

function filterByCategory(category) {
  if (category === "All") {
    renderCard();
  } else {
    const filteredMovies = movies.filter((movie) =>
      movie.Categories?.toLowerCase().includes(category.toLowerCase())
    );
    renderCard(filteredMovies);
  }
}

categoryLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const category = event.target.getAttribute("data-category");
    filterByCategory(category);
  });
});

renderCard();

function searchData() {
  const inputValue = searchInput.value.toLowerCase();
  const filterData = movies.filter(item => 
    typeof item.Title === "string" && item.Title.toLowerCase().includes(inputValue)
  );
  renderCard(filterData);
}

searchBtn.addEventListener('click', searchData);

sort1.addEventListener("click", () => {
  const validMovies = movies.filter(movie => movie && typeof movie.Title === "string");
  validMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  renderCard(validMovies);
});

sort2.addEventListener("click", () => {
  const validMovies = movies.filter(movie => movie && typeof movie.Title === "string");
  validMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  renderCard(validMovies);
});
