const getCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
getCategories();

// {
//       "id": 1,
//       "category_name": "Fruit Tree",
//       "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// },

const displayCategories = (categories) => {
  const categoriesBox = document.getElementById("Categories_box");
  for (let category of categories) {
    console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <h3 id="category-${category.id}"
    class="font-normal text-[16px] py-2 pl-[10px] rounded-[4px] ">
              ${category.category_name}
    </h3>
    
    `;
    categoriesBox.append(categoryDiv);
  }
};
