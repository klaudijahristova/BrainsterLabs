let count = null;
let start = 1;

function addCheckBoxListeners() {

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    const checkboxId = checkbox.id;
    const label = document.querySelector('label[for="' + checkboxId + '"]');
    const icon = document.querySelector(
      "#filter-" + checkboxId.split("-")[0] + " i.fa-solid"
    );

    icon.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      updateCheckboxStyle(checkbox);
      if (checkbox.checked) {
        uncheckOtherCheckboxes(checkbox);
      }

      start = 1;
      renderCards();
    });

    label.addEventListener("click", function (event) {
      event.preventDefault();
      checkbox.checked = !checkbox.checked;
      updateCheckboxStyle(checkbox);
      if (checkbox.checked) {
        uncheckOtherCheckboxes(checkbox);
      }
      
      start = 1;
      renderCards();
    });

    checkbox.style.display = "none";
  });
}

function addLoadMoreButtonListener() {
  let loadMoreBtn = document.querySelector('.load-more');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      start += 1;
      renderCards();
    })
  }
}

function uncheckOtherCheckboxes(checkedCheckbox) {

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    if (checkbox !== checkedCheckbox) {
      checkbox.checked = false;
      updateCheckboxStyle(checkbox);
    }
  });
}

function updateCheckboxStyle(checkbox) {
  const label = document.querySelector('label[for="' + checkbox.id + '"]');
  const filterElement = document.querySelector(
    "#filter-" + checkbox.id.split("-")[0]
  );

  if (checkbox.checked) {
    filterElement.style.backgroundColor = "#eb3b3b";
    label.style.color = "#302f38";
  } else {
    filterElement.style.backgroundColor = "";
    label.style.color = "";
  }
}


function filterCards() {
  
  const checkedFilter = document.querySelector('input[type="checkbox"]:checked');
  if (checkedFilter) {
   
    const checkboxId = checkedFilter.id;
    const filter = checkboxId.split("-")[0];

    
    const cardsCopy = [];
    for (let i = 0; i < cardsData.length; i++) {
      cardsCopy.push(cardsData[i]);
    }
    const filteredCards = cardsCopy.filter(function (card) {
      
      if (card.id === filter) {
        return true;
      }
      return false;
    });
    return filteredCards;
  }
  return cardsData;
}


function renderCards() {
  const containerEl = document.querySelector(".cards-container");
  containerEl.innerHTML = "";

  const filteredCards = filterCards();
  let cards = [];

  if (count) {
    const lastIndex = start * count;
    for (let i = 0; i < filteredCards.length; i++) {
      if (i >= lastIndex) {
        break;
      }
      cards.push(filteredCards[i]);
    }
  } else {
    cards = filteredCards;
  }

  let loadMoreBtn = document.querySelector('.load-more');

  if (cards.length < filteredCards.length) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
  }

  cards.forEach(function (data) {
    renderCard(containerEl, data);
  });
}


function renderCard(containerEl, cardData) {
  const card = document.createElement("div");
  card.classList = `col-12 col-md-4 my-2 desiredCard ${cardData.id} cards`;

  const cardWrapper = document.createElement("div");
  cardWrapper.classList = "card h-100 shadow";

  const image = document.createElement("img");
  image.src = cardData.image.src;
  image.alt = cardData.image.alt;
  image.classList = "img-fluid card-img-top";
  cardWrapper.appendChild(image);

  const cardTextInfoWrapper = document.createElement("div");
  cardTextInfoWrapper.classList = "card-body d-flex flex-column";

  const cardTitleContainer = document.createElement("div");
  const cardTitle = document.createElement("p");
  cardTitle.classList = "px-2 py-1 d-inline-block bg-color-yellow text-black";
  cardTitle.innerHTML = cardData.title;
  cardTitleContainer.appendChild(cardTitle);
  cardTextInfoWrapper.appendChild(cardTitleContainer);

  const projectTitle = document.createElement("p");
  projectTitle.classList = "h5 card-title fw-bold";
  projectTitle.innerHTML = cardData.projectTitle;
  cardTextInfoWrapper.appendChild(projectTitle);

  const projectDescription = document.createElement("p");
  projectDescription.classList = "card-text mb-2 mb-auto lh-1";
  projectDescription.innerHTML = cardData.projectDescription;
  cardTextInfoWrapper.appendChild(projectDescription);

  const projectDuration = document.createElement("small");
  projectDuration.classList = "mt-3 d-block fw-bold";
  projectDuration.innerHTML = cardData.projectDuration;
  cardTextInfoWrapper.appendChild(projectDuration);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList = "text-end mt-4";
  const button = document.createElement("a");
  button.classList = "btn btn-danger text-white px-4";
  button.href = "#";
  button.innerText = "Дознај повеќе";
  buttonContainer.appendChild(button);
  cardTextInfoWrapper.appendChild(buttonContainer);

  cardWrapper.appendChild(cardTextInfoWrapper);
  card.appendChild(cardWrapper);
  containerEl.appendChild(card);
}

document.addEventListener("DOMContentLoaded", function () {
  onResize();
  addCheckBoxListeners();
  addLoadMoreButtonListener();
  renderCards();
});

window.onresize = function () {
  onResize();
};

function onResize() {
  if (document.documentElement.clientWidth <= 425) {
    count = 6;
    start = 1;
    renderCards();
  } else {
    count = null;
    start = 1;
    renderCards();
  }
}