"use strict";
const select = document.querySelector(".cars");
const blockInfo = document.querySelector(".infoCar");
console.log(blockInfo.innerHTML);
const arrCar = [];
const getData = (url) => {
  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log("Данные не получены " + error));
};
const showRres = (item) => {
  blockInfo.innerHTML = "";
  blockInfo.insertAdjacentHTML(
    "beforeend",
    `
  <p>Тачка: ${item.brand}${item.model}</p>
 
   <p>Цена: ${item.price}</p>
`
  );
};
const carFilter = (cars, value) => {
  if (cars.brand === value) return showRres(cars);
};
const renderCars = (obj) => {
  obj.then((data) => {
    for (let key in data) {
      data[key].forEach((item, index) => {
        const { brand, model, price } = item;
        const option = document.createElement("option");
        option.value = index;
        option.textContent = brand;
        arrCar.push(select.appendChild(option));

        select.addEventListener("change", () => {
          const selectName = select.options[select.selectedIndex].textContent;
          if (selectName !== "Выбери авто") {
            carFilter(item, selectName);
          } else {
            blockInfo.innerHTML = "";
          }
        });
      });
    }
  });
};

renderCars(getData("./db/cars.json"));
