// Select all buttons inside the .timeframes container
const buttons = document.querySelectorAll(".timeframes button");
//Tiles container
const tilesWrapper = document.getElementById("tiles_wrapper");

let activeTimeframe = "weekly";

let json = [];

// append the data to the DOM
const populateDOM = (data) => {
  // Clear the existing items before re-rendering
  tilesWrapper.innerHTML = "";
  // with a forEach loop
  json.forEach((item) => {
    appendItem(item, activeTimeframe);
  });
};

// fetch the JSON data
fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong.");

    return response.json();
  })
  .then((data) => {
    json = data;
    // handle the data
    populateDOM(data); // initial rendering
  });

// Add a click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove the 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active"));
    // Add the 'active' class to the clicked button
    button.classList.add("active");
    activeTimeframe = button.getAttribute("id");
    populateDOM(); // Re-render with the updated timeframe
  });
});

const appendItem = (item, tf) => {
  // add the markup for each item to the DOM
  tilesWrapper.innerHTML += `
  <div class="tile" style="background-color: ${
    item.title === "Work"
      ? "rgba(255, 139, 100, 1)"
      : item.title === "Study"
        ? "rgba(255, 94, 125, 1)"
        : item.title === "Exercise"
          ? "rgba(75, 207, 130, 1)"
          : item.title === "Social"
            ? "rgba(115, 53, 210, 1)"
            : item.title === "Self Care"
              ? "rgba(241, 199, 91, 1)"
              : item.title === "Play"
                ? "rgba(85, 194, 230, 1)"
                : null
  }">
      <img src="./images/icon-${item.title.toLowerCase()}.svg" alt="image-${item.title.toLowerCase()}">
      <div class="details">
        <div class="title">
          <p class="activity-name">${item.title}</p>
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div class="activity">
        ${
          tf === "weekly"
            ? `<p class="duration">${item.timeframes.weekly.current}hrs</p>
          <p class="timeframe">Last Week - ${item.timeframes.weekly.previous}hrs</p>`
            : tf === "monthly"
              ? `<p class="duration">${item.timeframes.monthly.current}hrs</p>
          <p class="timeframe">Last Week - ${item.timeframes.monthly.previous}hrs</p>`
              : tf === "daily"
                ? `<p class="duration">${item.timeframes.daily.current}hrs</p>
          <p class="timeframe">Last Week - ${item.timeframes.daily.previous}hrs</p>`
                : null
        }         
        </div>
      </div>
    </div>
  `;
};
