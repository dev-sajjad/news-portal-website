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

loadData();

// display catagories data function 
const displayCatagories = (catagories) => {
	const catagoriesField = document.getElementById('catagories');
	catagories.forEach(catagory => {
		const {category_id,category_name} = catagory;
		const catagoryItem = document.createElement('div')
		catagoriesField.classList.add('cursor-pointer')
		catagoryItem.innerHTML = `
			<a class="px-2  py-2 text-success fs-5 fw-semibold" onclick="loadNews('${category_id}')">${category_name}</a>
		`;
		catagoriesField.appendChild(catagoryItem)
	})
}

// news data load function 
const loadNews = async (id) => {
	loadSpinner(true)
	try {
		const url = `https://openapi.programming-hero.com/api/news/category/${id}`
		const res = await fetch(url)
		const data = await res.json()
		displayNews(data.data)
	} catch {
		console.log(error)
	}
}