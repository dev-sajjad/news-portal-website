// modal data load
const moreNewsDetails = async (newsItemId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${newsItemId}`;
    const res = await fetch(url);
    const data = await res.json();
    dispalyMoreNewsDetails(data.data);
  } catch {
    console.log(error);
  }
};
// display More information of news by modal
const dispalyMoreNewsDetails = (data) => {
  const modalField = document.getElementById("modal-field");
  modalField.textContent = "";
  const moreDetails = data[0];
  const { image_url, title, details } = moreDetails;
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-content");
  modalDiv.innerHTML = `
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">More Details</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<img class="img-fluid w-100" src="${image_url}">
				<h4 class="my-3">${title}</h4>
				<p>${details}</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
	`;
  modalField.appendChild(modalDiv);
};

// news data load function
const loadNews = async (id) => {
  loadSpinner(true);
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  } catch {
    console.log(error);
  }
};

/// news display in ui
const displayNews = (news) => {
  news.sort((first, second) => second.total_view - first.total_view);
  const newsField = document.getElementById("news-field");
  const newsItemCountField = document.getElementById("news-item-count");
  const noNews = document.getElementById("no-news");
  if (news.length === 0) {
    noNews.classList.remove("d-none");
    newsItemCountField.classList.add("d-none");
  } else {
    noNews.classList.add("d-none");
    newsItemCountField.classList.remove("d-none");
    newsItemCountField.innerText = `${news.length} news are founded`;
  }
  newsField.textContent = "";
  news.forEach((newsItem) => {
    const { thumbnail_url, title, details, author, total_view, rating, _id } =
      newsItem;
    const newsItemDiv = document.createElement("div");
    newsItemDiv.setAttribute("data-bs-toggle", "modal");
    newsItemDiv.setAttribute("data-bs-target", "#exampleModal");
    newsItemDiv.classList.add("card", "mb-3");
    newsItemDiv.innerHTML = `
			<div class="row g-0" onclick="moreNewsDetails('${_id}')">
				<div class="col-md-3 d-flex justify-content-center justify-content-md-start ">
					<img src="${thumbnail_url}" class="img-fluid rounded-start w-100 pe-lg-5" alt="...">
				</div>
				<div class="col-md-9 d-flex flex-column">
					<div class="card-body">
						<h4 class="card-title">${title}</h4>
						<p class="card-text">${details.slice(0, 500)}</p>
						<p class="card-text">${details.slice(500, 700)} ...</p>
					</div>

					<div class="card-footer mt-0 pt-0 mb-lg-3 bg-transparent border-top-0 d-flex flex-column flex-sm-row align-items-center">
						<div class="col-md-4 d-flex align-items-center">
							<div class="col-md-3 col-3">
								<img class="img-fluid w-75 rounded-circle" src="${
                  author?.img ? author.img : "No image"
                }">
							</div>
							<div class="col-md-9 m-0">
								<h6 class="m-0">${author?.name ? author.name : "No name"}</h6>
								<p class="m-0 fs-6" >${
                  author?.published_date
                    ? author.published_date
                    : "no published date"
                }</p>
							</div>
						</div>
						<div class="col-md-8 col-12 d-flex align-items-center justify-content-between mt-2 mt-md-0">
							<div class="col-md-3 d-flex">
								<img src="../images/eye.png">
								<span class="ms-2">${total_view ? total_view : "No view"}</span>
							</div>
							<div class="col-md-6 d-flex">
								<div>
									<img class="img-fluid" src="../images/star-half.png">
									<img class="img-fluid" src="../images/star.png">
									<img class="img-fluid" src="../images/star.png">
									<img class="img-fluid" src="../images/star.png">
									<img class="img-fluid" src="../images/star.png">
								</div>	
								<span class="ms-2 fs-5 my-auto">${rating?.number ? rating.number : 0}</span>
							</div>
							<div class="col-md-3">
								<p class="fs-1 text-success m-0" onclick="moreNewsDetails('${_id}')">&#8594</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		`;
    newsField.appendChild(newsItemDiv);
  });
  loadSpinner(false);
};

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



// display catagories data function
const displayCatagories = (catagories) => {
  const catagoriesField = document.getElementById("catagories");
  catagories.forEach((catagory) => {
    const { category_id, category_name } = catagory;
    const catagoryItem = document.createElement("div");
    catagoriesField.classList.add("cursor-pointer");
    catagoryItem.innerHTML = `
			<a class="px-2  py-2 text-success fs-5 fw-semibold" onclick="loadNews('${category_id}')">${category_name}</a>
		`;
    catagoriesField.appendChild(catagoryItem);
  });
};

loadData();
