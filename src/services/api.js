export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
}

export async function getProductsFromQuery(query) {
  const url = ` https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
  const resultsProducts = await response.json();
  return resultsProducts;
}

export async function getProductsFromCategory(idCategory) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${idCategory}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

export async function getProductItemFromId(idProduct) {
  const url = `https://api.mercadolibre.com/items/${idProduct}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
