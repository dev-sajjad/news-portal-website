// catagories data load
const loadData = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCatagories(data.data.news_category);
  } catch {
    console.log(error);
  }
};
