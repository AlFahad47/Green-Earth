const getCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
getCategories();

const loadTreeCards = (id) => {
  const url =
    id === 0
      ? "https://openapi.programming-hero.com/api/plants"
      : `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTreeCards(data.plants));
};
loadTreeCards(0);

// {
//       "id": 1,
//       "category_name": "Fruit Tree",
//       "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// },

const displayCategories = (categories) => {
  const categoriesBox = document.getElementById("Categories_box");
  //   categoriesBox.innerHTML = "";
  for (let category of categories) {
    // console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn bg-[#f0fdf4] hover:bg-[#15803D90] border-none w-full" id="category-${category.id}" onclick = "loadTreeCards(${category.id})"
    class="font-normal text-[16px] py-2 pl-[10px] rounded-[4px] ">
              ${category.category_name}
    </button>
    
    `;
    categoriesBox.append(categoryDiv);
  }
};

//  {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
//   }

const displayTreeCards = (plants) => {
  console.log(plants);
  const treeCardsBox = document.getElementById("tree_cards_box");
  treeCardsBox.innerHTML = "";

  for (let plant of plants) {
    console.log(plant);
    const card = document.createElement("div");
    card.innerHTML = `
    
     <div
            class="bg-white  max-w-[343px] lg:max-w-none py-4 rounded-lg flex flex-col items-center"
          >
            <!-- image -->
            <div
              class="max-w-11/12 max-h-[186px] overflow-hidden rounded-lg flex items-center"
            >
              <img
                src="${plant.image}"
                alt=""
                class=""
              />
            </div>

            <div class="space-y-2 my-3 w-11/12">
              <h2 class="font-semibold text-sm">${plant.name}</h2>
              <p class="font-normal text-xs">
                ${plant.description}
              </p>
              <div class="flex justify-between">
                <button
                  class="btn border-none shadow-none rounded-full bg-[#DCFCE7] text-[#15803D]"
                >
                  ${plant.category}
                </button>
                <h2>৳ <span>${plant.price}</span></h2>
              </div>
            </div>
            <button
              class="btn border-none shadow-none rounded-full bg-[#15803D] text-white w-11/12"
            >
              Add to Cart
            </button>
          </div>
    
    `;

    treeCardsBox.append(card);
  }
};
