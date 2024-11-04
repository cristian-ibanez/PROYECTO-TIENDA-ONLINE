const products = [
  {
    id: 1,
    name: "Sandía",
    image: "images/95.png",
    description: "Deliciosa sandia foto.",
    price: 10,
    stock: 20,
  },
  {
    id: 2,
    name: "Acelgas",
    image: "images/94.png",
    description: "Acelgas sin envolver.",
    price: 5,
    stock: 50,
  },
  {
    id: 3,
    name: "Limones",
    image: "images/3.png",
    description: "Limones naturales",
    price: 5,
    stock: 50,
  },
  {
    id: 4,
    name: "Naranjas",
    image: "images/pr2.png",
    description: "Hamburguesa con salsa BBQ y cebolla caramelizada.",
    price: 12,
    stock: 15,
  },
  {
    id: 5,
    name: "Arándanos",
    image: "images/pr3.png",
    description: "Arándanos sin envolver.",
    price: 8,
    stock: 25,
  },
  {
    id: 6,
    name: "Moras",
    image: "images/pr4.png",
    description: "Moras marruecos.",
    price: 3,
    stock: 100,
  },
  {
    id: 7,
    name: "Fresas",
    image: "images/pr5.png",
    description: "Fresas naturales del país.",
    price: 7,
    stock: 40,
  },
  {
    id: 8,
    name: "Tarta de Queso",
    image: "images/pr8.png",
    description: "Tarta de queso con base de galleta.",
    price: 6,
    stock: 30,
  },
  {
    id: 9,
    name: "Manzanas",
    image: "images/99.png",
    description: "Manzana golden.",
    price: 4,
    stock: 20,
  },
  {
    id: 10,
    name: "Piña",
    image: "images/98.png",
    description: "Piña del Hierro.",
    price: 2,
    stock: 60,
  },
  {
    id: 11,
    name: "Tomates",
    image: "images/97.png",
    description: "Tomates ensaladas.",
    price: 14,
    stock: 10,
  },
  {
    id: 12,
    name: "Naranjas grandes",
    image: "images/96.png",
    description: "Naranjas extras.",
    price: 5,
    stock: 35,
  },
];

// Inicio carrito virtual
const virtualCartList = [];

// Visibilidad del carrito compra.
let isVisibleCart = false;

// Cargamos productos y lo recorremos.
function loadProducts() {
  // Selecciona el contenedor donde se mostrarán los productos
  let $container = document.querySelector("#product_list");
  // Recorre cada producto en el array `products` y crea sus elementos HTML
  for (let product of products) {
    let $product = document.createElement("div");
    $product.classList.add("product");

    // Crea la imagen
    let $img = document.createElement("img");
    $img.src = product.image;
    $img.alt = product.name;
    $product.appendChild($img);

    // Crea el contenedor del producto
    let $content = document.createElement("div");
    $content.classList.add("product-txt");

    // Añado el título
    let $title = document.createElement("h3");
    $title.innerHTML = product.name;
    $content.appendChild($title);

    // Añado el precio
    let $price = document.createElement("p");
    $price.classList.add("precio");
    $price.innerHTML = product.price + "€";
    $content.appendChild($price);

    // Añado el boton y funcion añadir al carrito
    let $addToCartButton = document.createElement("button");
    $addToCartButton.classList.add("btn-2");
    $addToCartButton.textContent = "Agregar";
    $addToCartButton.dataset.id = product.id;
    $addToCartButton.addEventListener("click", addToCart);
    $content.appendChild($addToCartButton);
    // Añade el contenido y la imagen al contenedor del producto
    $product.appendChild($content);
    $container.appendChild($product);
  }
  // Actualiza el carrito para mostrar productos si hay alguno agregado
  updateShoppingCart();

  // Evento para mostrar u ocultar el carrito al hacer clic en el botón
  const $displayCart = document.querySelector("#display_cart");
  $displayCart.addEventListener("click", toggleShowCart);
}
// Mostrar/Ocultar carrito.
function toggleShowCart() {
  const $listShoppingCart = document.getElementById("CartList");

  if (isVisibleCart === false) {
    $listShoppingCart.style.display = "block"; // Muestra el carrito
    isVisibleCart = true;
  } else {
    $listShoppingCart.style.display = "none"; // Oculta el carrito
    isVisibleCart = false;
  }
}

// Agregar productos al carrito.
function addToCart() {
  const idProduct = this.dataset.id;
  // Busca el producto en el array `products` usando su id
  const productFound = products.find((item) => item.id === Number(idProduct));
  virtualCartList.push(productFound);

  // Crea una fila en el carrito para el producto agregado
  const row = createRow(productFound);
  // Selecciona el contenedor del carrito y añade la nueva fila
  let $cart = document.querySelector("#cart");
  $cart.appendChild(row);
  // Actualiza el total del carrito
  updateShoppingCart();

  // Si el carrito no está visible, lo mostramos.
  if (!isVisibleCart) {
    toggleShowCart(); // Esto pondrá isVisibleCart en true y mostrará el carrito
  }
}

// Creamos fila para cada producto nuevo.
function createRow(newProduct) {
  const $row = document.createElement("tr");
  // Crea y añade la celda para el nombre del producto
  const $cellName = document.createElement("td");
  $cellName.innerText = newProduct.name;
  $row.appendChild($cellName);
  // Crea y añade la celda para el precio del producto
  const $cellPrice = document.createElement("td");
  $cellPrice.innerText = newProduct.price;
  $row.appendChild($cellPrice);
  // Crea el botón para eliminar el producto del carrito y lo añade a su celda
  const $cellRemove = document.createElement("td");
  const $removeButton = document.createElement("button");
  $removeButton.textContent = "Eliminar";
  $removeButton.dataset.id = newProduct.id;
  $removeButton.addEventListener("click", removeFromCart);
  $cellRemove.appendChild($removeButton);
  $row.appendChild($cellRemove);

  return $row;
}
// Función para eliminar un producto del carrito
function removeFromCart() {
  const idProduct = this.dataset.id;
  console.log("elimino", idProduct);
  // Encuentra el índice del producto en `virtualCartList` y lo elimina
  const productIndexToRemove = virtualCartList.findIndex(
    (item) => item.id == idProduct
  );

  // Elimino el que quiero de la lista
  virtualCartList.splice(productIndexToRemove, 1);
  // Vuelvo a pintar después eliminar producto
  updateShoppingCart();
}
// Función para actualizar el contenido del carrito, incluyendo el total
function updateShoppingCart() {
  const $cartTable = document.querySelector("#cart");
  $cartTable.innerHTML = ""; // Limpia el carrito antes de actualizar

  let total = 0;
  // Recorre cada producto en el carrito virtual y lo añade a la tabla
  for (const product of virtualCartList) {
    const file = createRow(product);
    $cartTable.appendChild(file);
    // Suma el precio del producto al total del carrito
    total = total + product.price;
  }
  // Actualiza el total en el HTML
  document.querySelector("#totalCart").innerHTML = "Total €: " + total;
}
// Llama a la función para cargar los productos al cargar la página
loadProducts();
