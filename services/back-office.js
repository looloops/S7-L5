const URL = "https://striveschool-api.herokuapp.com/api/product/";
const options = {
  method: "POST",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTg3NDRjNTllYzAwMTk5MGQ3M2QiLCJpYXQiOjE3MDkyODc1NDAsImV4cCI6MTcxMDQ5NzE0MH0.1ChIw-8ehnn2Rkb-ktfVfkDpF3aOC4Gfw0Ti_8hpc-c",
    "Content-Type": "application/json",
  },
};
const handleSubmit = (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  options.body = JSON.stringify(newProduct);

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
    .then((productCreated) => {
      console.log(productCreated);
      e.target.reset();
    })
    .catch((err) => console.log(err));
};
