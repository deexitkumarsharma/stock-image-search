const input = document.getElementById("input");
const grid = document.getElementsByClassName("grid")[0];

window.addEventListener("load", dayNightMode);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    loadImg();
  }
});

function loadImg() {
  removeImage();

  const url =
    "https://api.unsplash.com/search/photos?query=" +
    input.value +
    "&per_page=30&client_id=lOrmrlaikRnTdP5yG535D3HuuS43n7r-jgp_wQ1RXnM";

  fetch(url)
    .then((response) => {
      // console.log(response);
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })

    .then((data) => {
      const imageNodes = [];
      for (let i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage =
          "url(" + data.results[i].urls.raw + ")";
        imageNodes[i].addEventListener("dblclick", function () {
          window.open(data.results[i].links.download, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImage() {
  grid.innerHTMl = "";
}

function dayNightMode() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 7 && hour <= 19) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
}
