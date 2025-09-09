const getCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
getCategories();

// modal full tree details
const fullTreeDetailsModal = (plant) => {
  // console.log(plant);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `

  <div>
   <h2  class="font-bold text-lg mb-2">${plant.name}</h2>
  </div>

   <div
              class=" max-h-64 overflow-hidden rounded-lg flex items-center"
            >
              <img
                src="${plant.image}"
                alt=""
                class=""
              />
            </div>
    <h2 class="my-2" > <span class="font-bold text-sm ">Category:</span>  ${plant.category}</h2>
    <h2  > <span class="font-bold text-sm">Price:</span>  ${plant.price}</h2>
    <h2 class="my-2" > <span class="font-bold text-sm">Description:</span>  ${plant.description}</h2>
  
  `;
  document.getElementById("word_modal").showModal();
};

// add to cart
const treeCart = {};
const addToCart = (plant) => {
  // console.log(plant);
  if (treeCart[plant.id]) {
    treeCart[plant.id].quantity += 1;
  } else {
    treeCart[plant.id] = {
      price: plant.price,
      plantName: plant.name,
      quantity: 1,
    };
  }
  // console.log(treeCart[plant.id]);
  updateTreeCart();
};
const removeFromCart = (id) => {
  delete treeCart[id];
  updateTreeCart();
};
const updateTreeCart = () => {
  // console.log();
  let plantTotalPrice = document.getElementById("plant_total_price");
  let treeCartBox = document.getElementById("tree_cart_box");
  treeCartBox.innerHTML = "";
  let total = 0;

  for (let item in treeCart) {
    let itemTotal = treeCart[item].price * treeCart[item].quantity;
    total += itemTotal;

    treeCartBox.innerHTML += ` 
     <div
      class="bg-[#F0FDF4] flex justify-between items-center rounded-lg px-3 py-2"
              >
                <div>
                  <h2 class="font-semibold text-sm">${treeCart[item].plantName}</h2>
                  <p class="font-normal text-[16px] text-[#1F293795]">
                    ৳${treeCart[item].price} x ${treeCart[item].quantity}
                  </p>
                </div>
                <div onclick="removeFromCart(${item})" class="cursor-pointer text-[#8C8C8C]"><i class="fa-solid fa-xmark"></i></div>
      </div>
              
        `;
  }
  plantTotalPrice.innerText = total;
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("tree_cards_box").classList.add("hidden");
  } else {
    document.getElementById("tree_cards_box").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadTreeCards = (id) => {
  manageSpinner(true);
  const url =
    id === 0
      ? "https://openapi.programming-hero.com/api/plants"
      : `https://openapi.programming-hero.com/api/category/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const activeBtn = document.getElementById(`category-${id}`);
      activeBtn.classList.add("active");
      displayTreeCards(data.plants);
    });
};
loadTreeCards(0);

removeActive = () => {
  const activeBtns = document.querySelectorAll(".category-btn");
  activeBtns.forEach((activeBtn) => activeBtn.classList.remove("active"));
};

const shortDescription = (description) => {
  return description.length > 100
    ? description.slice(0, 100) + "..."
    : description;
};
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
    <button class="cursor-pointer text-left category-btn font-normal text-[16px] py-2 pl-[10px] rounded-[4px] bg-[#f0fdf4] hover:bg-[#15803D90] border-none w-full" id="category-${category.id}" onclick = "loadTreeCards(${category.id})"
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
  // console.log(plants);
  const treeCardsBox = document.getElementById("tree_cards_box");
  treeCardsBox.innerHTML = "";

  for (let plant of plants) {
    // console.log(plant);
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
              <h2 onclick='fullTreeDetailsModal(${JSON.stringify(
                plant
              )})' class="cursor-pointer font-semibold text-sm">${
      plant.name
    }</h2>
              <p class="font-normal text-xs">
                ${shortDescription(plant.description)}
              </p>
              <div class="flex justify-between items-center">
                <button
                  class="btn border-none shadow-none rounded-full bg-[#DCFCE7] text-[#15803D]"
                >
                  ${plant.category}
                </button>
                <h2>৳ <span>${plant.price}</span></h2>
              </div>
            </div>
            <button onclick='addToCart(${JSON.stringify(plant)})'
              class="btn border-none shadow-none rounded-full bg-[#15803D] text-white w-11/12"
            >
              Add to Cart
            </button>
          </div>
    
    `;

    treeCardsBox.append(card);
  }

  manageSpinner(false);
};
