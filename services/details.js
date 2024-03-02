let productFromDb = null;
let deleteConfirmationModal = null;
let deleteProductConfirmed = null;
let URL = "https://striveschool-api.herokuapp.com/api/product/";
const options = {
  method: "PUT",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTg3NDRjNTllYzAwMTk5MGQ3M2QiLCJpYXQiOjE3MDkyODc1NDAsImV4cCI6MTcxMDQ5NzE0MH0.1ChIw-8ehnn2Rkb-ktfVfkDpF3aOC4Gfw0Ti_8hpc-c",
    "Content-Type": "application/json",
  },
};

window.onload = function () {
  deleteConfirmationModal = new bootstrap.Modal("#delete-product-confirmation");
  deleteProductConfirmed = new bootstrap.Modal("#delete-product-confirmed");
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");
  URL += productId;

  if (!productId) {
    document.getElementsByTagName("body")[0].innerHTML =
      '<h1>Product not found!</h1><br><a href="./index.html">Go Home</a>';
  } else {
    getProductDetails(productId);
  }
};

function handleSubmit(e) {
  e.preventDefault();

  const editedProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  options.body = JSON.stringify(editedProduct);

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
    .then((productUpdated) => {
      e.target.reset();
      renderDataViewMode(productUpdated);
    })
    .catch((err) => console.log(err));
}

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
      productFromDb = product;
      if (!product) {
        document.getElementsByTagName("body")[0].innerHTML =
          '<h1>Product not found!</h1><br><a href="./index.html">Go Home</a>';
      } else {
        renderDataViewMode(product);
      }
    })
    .catch((err) => console.log(err));
}

function renderDataViewMode(product) {
  const productDetailsContainer = document.getElementById("product-details");
  let productCard = document.createElement("div");
  let prevProduct = document.getElementById(product._id);
  productCard.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3");
  productCard.setAttribute("id", product._id);
  productCard.innerHTML = `<div class="card" > 
         <img src="${product.imageUrl}" class="card-img-top w-100" style="object-fit:cover; height:460px " 
             alt="${product.name}">
         <div class="card-body" >
             <h5 class="card-title" style="height:100px">${product.name}</h5>
             <p class="card-text" >${product.description}</p>
             <p class="card-text" >${product.brand}</p>
             <p class="card-text justify-content-end" >${product.price} €</p>
             <button id="edit-action" onclick="renderDataEditMode()">Edit</a>
         </div>
      </div>`;

  if (prevProduct) productDetailsContainer.removeChild(prevProduct);
  productDetailsContainer.appendChild(productCard);
}

function renderDataEditMode() {
  let product = productFromDb;
  const productDetailsContainer = document.getElementById("product-details");
  let productCard = document.createElement("div");
  let prevProduct = document.getElementById(product._id);
  productCard.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3");
  productCard.setAttribute("id", product._id);
  productCard.innerHTML = `<form onsubmit="handleSubmit(event)">
            <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="name" placeholder="Inserisci il nome del prodotto" required value="${product.name}">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descrizione</label>
                <textarea type="text" class="form-control" id="description" placeholder="Inserisci una descrizione"
                    rows="6" required>${product.description}</textarea>
            </div>
            <div class="mb-3">
                <label for="brand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="brand" placeholder="Inserisci il brand del prodotto"
                    required value="${product.brand}">
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
                <button id="deleteBtn" type="button" class="btn btn-danger" onclick="alertDelete()"
                    style="line-height: 0;">
                    Delete
                </button>
            </div>
        </form>`;

  if (prevProduct) productDetailsContainer.removeChild(prevProduct);
  productDetailsContainer.appendChild(productCard);
}

function alertDelete() {
  document.getElementById(
    "delete-product-confirmation-text"
  ).innerText = `Sei sicuro di voler eliminare il prodotto "${productFromDb.name}"?`;
  deleteConfirmationModal.show();
}

function confirmProductDelete() {
  options.method = "DELETE";
  fetch(URL, options)
    .then((resp) => resp.json())
    .then((deletedProduct) => {
      document.getElementById(
        "delete-product-confirmed-text"
      ).innerText = `Il prodotto "${productFromDb.name}" è stato correttamente eliminato.`;
      deleteConfirmationModal.hide();
      deleteProductConfirmed.show();
      document.getElementById(deletedProduct._id).remove();
      document.getElementById("delete-product-confirmed").addEventListener("hide.bs.modal", () => {
        window.location.assign("./index.html");
      });
    });
}
