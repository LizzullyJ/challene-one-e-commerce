const apiUrl = 'http://localhost:3000'; // Asegúrate de que la URL coincida con la de tu json-server

async function fetchData() {
    try {
        const response = await fetch(`${apiUrl}/productos`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch(`${apiUrl}/categorias`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

export { fetchData, fetchCategories };