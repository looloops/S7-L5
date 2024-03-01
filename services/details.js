let productt = null;
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");
  if (!productId) {
    return alert("Product not found!");
  }
  getProductDetails(productId);
};

function getProductDetails(id) {
  const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
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
    .then((product) => {
      console.log(product);
      productt = product;
      renderDataViewMode(product);
    })
    .catch((err) => console.log(err));
}

function renderDataViewMode(product) {
  const productDetailsContainer = document.getElementById("product-details");
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
      <button onclick="renderDataEditMode()">Edit</a>
      </div>
      </div>`;

  productDetailsContainer.appendChild(productCard);
}

function renderDataEditMode() {
  let product = productt;
  const productDetailsContainer = document.getElementById("product-details");
  let productCard = document.createElement("div");
  productCard.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3");
  productCard.setAttribute("id", product._id);
  productCard.innerHTML = `<form onsubmit="handleSubmit(event)">
            <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="name" placeholder="Inserisci il nome del prodotto" required value="${product.name}>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descrizione</label>
                <textarea type="text" class="form-control" id="description" placeholder="Inserisci una descrizione"
                    rows="6" required value="${product.description}></textarea>
            </div>
            <div class="mb-3">
                <label for="brand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="brand" placeholder="Inserisci il brand del prodotto"
                    required value="${product.brand}>
            </div>
            <div class="mb-3">
                <label for="imageUrl" class="form-label">Immagine</label>
                <input type="text" class="form-control" id="imageUrl" value="${product.imageUrl}"
                    placeholder="${product.name}" required>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Prezzo</label>
                <input type="number" class="form-control" id="price" placeholder="1€" value="${product.price}">
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Salva</button>
                <button id="deleteBtn" type="button" class="btn btn-danger d-none" onclick="handleDelete()"
                    style="line-height: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </button>
            </div>
        </form>`;

  productDetailsContainer.appendChild(productCard);
}
