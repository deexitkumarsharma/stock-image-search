dayNightTheme = () => {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 7 && hour < 19) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
};

window.addEventListener("load", dayNightTheme);

document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter") apiRequest();
});

apiRequest = () => {
  document.querySelector("#grid").textContent = "";

  const url =
    "https://api.unsplash.com/search/photos?query=" +
    input.value +
    "&per_page=30&client_id=lOrmrlaikRnTdP5yG535D3HuuS43n7r-jgp_wQ1RXnM";

  fetch(url)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })

    .then((data) => {
      loadImages(data);
    })

    .catch((error) => console.log(error));
};

loadImages = (data) => {
  for (let i = 0; i < data.results.length; i++) {
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage =
      "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
    image.addEventListener("dblclick", function () {
      window.open(data.results[i].links.download, "_blank");
    });
    document.querySelector("#grid").appendChild(image);
  }
};


// for random images on feed

const container = document.querySelector("#grid");
const baseURL = "https://source.unsplash.com/random/";
const rows = 7;

for (let i = 0; i < rows * 3; i++) {
  const img = document.createElement("img");
  img.src = `${baseURL}${randomSize()}`;
  container.appendChild(img);
}

function randomSize() {
  return `${randomNumber()}x${randomNumber()}`;
}

function randomNumber() {
  return Math.floor(Math.random() * 10) + 300;
}