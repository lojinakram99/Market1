const productContainer = document.querySelector(".products");
const btn = document.querySelector(".showProductBtn");

btn.addEventListener("click", async () => {
  console.log("button clicked");
  btn.disabled = true;
  btn.textContent = "Loading...";

  async function fetchProduct() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const products = data.products;
    return products;
  }
  try {
    const products = await fetchProduct();
    productContainer.innerHTML = products.map(creatProductCard).join("");
    btn.disabled = false;
    btn.textContent = "Click to show product";
  } catch (err) {
    console.error(err);
    productContainer.innerHTML = `<div class="alert alert-danger text-center">${err.message}</div>`;
    btn.disabled = false;
    btn.textContent = "Click to show product";
  }
});

function creatProductCard(product) {
  return `
      <div class="col-md-5 col-lg-3">
            <div class="card h-100">
                <img src="${product.thumbnail}"
                     class="card-img-top"
                     alt="${product.title}">
                <div class="card-body">

                    <h4 class="card-title">${product.title}</h4>
                    <p class="text-secondary">${product.category}</p>
                    <p class="card-text">${product.description}</p>

                    <p class="text-success fw-bold">$${product.price}</p>
                    <button class="btn btn-primary w-100">View Product</button>
                </div>
            </div>
        </div>
    `;
}
