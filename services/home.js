const URL = "https://striveschool-api.herokuapp.com/api/product/";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTg3NDRjNTllYzAwMTk5MGQ3M2QiLCJpYXQiOjE3MDkyODc1NDAsImV4cCI6MTcxMDQ5NzE0MH0.1ChIw-8ehnn2Rkb-ktfVfkDpF3aOC4Gfw0Ti_8hpc-c",
  },
};
fetch(URL, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("Si è verificato un errore, si prega di verificare i dati inseriti.");
      }

      if (response.status === 404) {
        throw new Error("Dato non trovato");
      }

      if (response.status === 500) {
        throw new Error("Errore lato server");
      }

      throw new Error("Errore nel reperimento dati");
    }
  })
  .then((productsList) => {
    console.log(productsList);
    renderData(productsList);
  })
  .catch((err) => console.log(err));

function renderData(products) {
  if (!products || products.length === 0) {
    return;
  }

  const productsContainer = document.getElementById("products-container");

  products.forEach((product, index) => {
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3");
    productCard.setAttribute("id", product._id);
    productCard.innerHTML = `<div class="card" > 
      <img src="${product.imageUrl}" class="card-img-top w-100" style="object-fit:cover; height:460px " alt="${product.name}">
      <div class="card-body" >
      <h5 class="card-title" style="height:100px">${product.name}</h5>
      <p class="card-text" >${product.description}</p>
      <p class="card-text" >${product.brand}</p>
      <p class="card-text justify-content-end" >${product.price} €</p>
      <a href="./details.html?productId=${product._id}">Dettagli</a>
      </div>
      </div>`;

    productsContainer.appendChild(productCard);
  });
}
