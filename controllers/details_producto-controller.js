// js/controllers/details_producto-controller.js
import { fetchData, fetchCategories } from '../services/product-services.js';
// Obtener los productos de la categoría seleccionada desde el almacenamiento local
const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));

// Función para mostrar los detalles del producto
function showProductDetails(product) {
    const detalleProductoInfo = document.querySelector('.detalle-producto__info[data-details]');
    detalleProductoInfo.innerHTML = `
        <div class="detalle-producto__imagen">
            <img src="${product.imagen}" alt="Imagen del producto">
        </div>
        <div class="detalle-producto__box">
            <h2 class="detalle-producto__nombre">${product.nombre}</h2>
            <p class="detalle-producto__precio">$${product.precio}</p>
            <p class="detalle-producto__descripcion">${product.descripcion}</p>
        </div>
    `;
}

// Función para mostrar productos similares
function showSimilarProducts(products) {
    const productosSimilaresList = document.querySelector('.productos__list');
    productosSimilaresList.innerHTML = '';

    for (const product of products) {
        const productItem = document.createElement('div');
        productItem.className = 'productos__item galeria__item';
        productItem.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h4 class="productos__item-nombre">${product.nombre}</h4>
            <p class="productos__item-precio">$${product.precio}</p>
            <a href="#" class="productos__item-enlace">Ver Producto</a>
        `;

        productItem.querySelector('.productos__item-enlace').addEventListener('click', () => {
            // Aquí puedes manejar la navegación a la página de detalles del producto individual
            // Puedes usar una estructura similar a la anterior para mostrar los detalles del producto seleccionado
        });

        productosSimilaresList.appendChild(productItem);
    }
}

// Obtener el producto seleccionado desde el almacenamiento local (si lo necesitas)
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

// Mostrar los detalles del producto seleccionado
if (selectedProduct) {
    showProductDetails(selectedProduct);
}

// Mostrar productos similares de la misma categoría
if (selectedCategory) {
    showSimilarProducts(selectedCategory);
}