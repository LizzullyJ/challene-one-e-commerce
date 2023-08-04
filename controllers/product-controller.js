import { fetchData, fetchCategories } from '../services/product-services.js';

async function createProductItem(product) {
    const item = document.createElement('div');
    item.className = 'productos__item galeria__item';
    item.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}">
        <h4 class="productos__item-nombre">${product.nombre}</h4>
        <p class="productos__item-precio">$${product.precio}</p>
        <a href="../screens/details-producto.html?id=${product.id}" class="productos__item-enlace">Ver Producto</a>
    `;
    return item;
}

async function renderProducts() {
    const galeria = document.querySelector('.galeria[data-product]');
    const data = await fetchData();

    const categorias = await fetchCategories();
    for (const categoria of categorias) {
        const categoriaBox = document.createElement('div');
        categoriaBox.className = 'galeria__categoria-box';
        categoriaBox.innerHTML = `
            <div class="galeria__categoria-header">
                <h2 class="galeria__categoria-titulo">${categoria.name}</h2>
                <a href="#" class="galeria__categoria-enlace">Ver todo
                    <i class="galeria__categoria-icon fas fa-arrow-right"></i></a>
            </div>
            <div class="productos__list"></div>
        `;

        const categoriaList = categoriaBox.querySelector('.productos__list');
        const productsInCategory = data.filter(product => product.categoria === categoria.name);
        for (const product of productsInCategory) {
            const productItem = await createProductItem(product);
            categoriaList.appendChild(productItem);
        }

       // galeria.appendChild(categoriaBox);

        //-----
        for (const product of productsInCategory) {
            const productItem = await createProductItem(product);
            categoriaList.appendChild(productItem);
    
            // Agregar evento clic al enlace "Ver Producto"
            const enlaceProducto = productItem.querySelector('.productos__item-enlace');
            enlaceProducto.addEventListener('click', () => {
                window.location.href = `./screens/details-producto.html?id=${product.id}`;
            });
        }
    
        galeria.appendChild(categoriaBox);
    }
}


function redirectToProductDetails(productId) {
    window.location.href = `screens/details-producto.html?id=${productId}`;
}

// Escuchar el evento click en los enlaces de categoría
document.addEventListener('click', async event => {
    const enlaceCategoria = event.target.closest('.galeria__categoria-enlace');
    if (enlaceCategoria) {
        const categoriaTitulo = enlaceCategoria.closest('.galeria__categoria-header').querySelector('.galeria__categoria-titulo').textContent;
        const categorias = await fetchCategories();
        const categoria = categorias.find(cat => cat.name === categoriaTitulo);
        if (categoria) {
            redirectToProductDetails(categoria.id);
        }
    }
});

renderProducts();

