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
    if (!productsList || productsList.length === 0) {
      document.getElementsByTagName("main")[0].innerHTML =
        '<h1>No products defined!</h1><br><a href="./back-office.html">Go to Back Office to add your first product</a>';
    } else {
      renderData(productsList);
    }
  })
  .catch((err) => console.log(err));

function renderData(products) {
  if (!products || products.length === 0) {
    return;
  }

  const productsContainer = document.getElementById("products-container");

  products
    .sort(function (prevProd, nextProd) {
      return new Date(nextProd.updatedAt) - new Date(prevProd.updatedAt);
    })
    .forEach((product, index) => {
      let productCard = document.createElement("div");
      productCard.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3 px-2");
      moment.locale("it-it");
      productCard.setAttribute("id", product._id);
      productCard.innerHTML = `<div class="card" > 
      <img src="${product.imageUrl}" class="card-img-top w-100" style="object-fit:cover; height:350px " alt="${
        product.name
      }">
      <h5 class="card-header">${product.name}</h5>
      <div class="card-body">
      <h6 class="card-subtitle mb-2 text-body-secondary">${product.brand}</h6>
      <p class="card-text" >${product.description}</p>
      <p class="card-text" ><strong>${new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(product.price)}</strong></p>
      <a href="./details.html?productId=${product._id}" class="btn btn-primary">Dettagli</a>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">Ultimo aggiornamento ${moment(product.updatedAt)
          .startOf("minute")
          .fromNow()}</small>
      </div>
      </div>`;

      productsContainer.appendChild(productCard);
    });
}
