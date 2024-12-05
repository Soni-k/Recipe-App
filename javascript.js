// https://www.themealdb.com/  api
const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeCont=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');



const fetchRecipes=async (query)=>{
	recipeCont.innerHTML="<h2>Fetching Recipe...</h2>";
	try {
		
	
	const urlData= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
	const response =await urlData.json();
	// console.log(response.meals[0]);
	 
  recipeCont.innerHTML="";

	response.meals.forEach(meal => {
		console.log(meal);
		const recipeDiv= document.createElement('div');
		recipeDiv.classList.add('recipe');
		recipeDiv.innerHTML=`
		  <img src="${meal.strMealThumb}">
			<h3>${meal.strMeal}</h3>
			<p><span>${meal.strArea}</span> Dish</p>
			<p>Belongs to<span> ${meal.strCategory} </span> Category</p>
		`
		const button =document.createElement('button');
    button.textContent="View Recipe";
    recipeDiv.appendChild(button);

		button.addEventListener('click',()=>{
      openRecipePopup(meal);
		});

		recipeCont.appendChild(recipeDiv);
		
	});

  } catch (error) {
		recipeCont.innerHTML="<h2>Error in Fetching Recipe...</h2>";
  }
}

// fun to fetch ingredients and measurement 
const fetchIngredients =(meal)=>{
	let ingredientsList ="";
	for (let i = 1; i <=20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		if(ingredient){
			const measure=meal[`strMeasure${i}`];
			ingredientsList +=`<li>${measure} ${ingredient}</li>`
		}
		else{
			break;	
		}
		
		
	}
	return ingredientsList;
}
const openRecipePopup=(meal) =>{
  recipeDetailsContent.innerHTML=`
	  <h2 class="recipeName">${meal.strMeal}</h2>
		<h3>Ingredients:</h3>
		<ul class="ingredientList">${fetchIngredients(meal)}</ul>
		<div class="recipeInstruction" >
		  <h3>Instructions</h3>
		  <p>${meal.strInstructions}</p>
	  </div>
	`
	
	recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click' ,()=>{
	recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener('click',(e)=>{
	// auto submit hone se rok lega (e parameter) e.preventDefault();
	e.preventDefault();
	const searchInput =searchBox.value.trim();
	// console.log("print");

	// without input not search  (nhi to random input search )
	if(! searchInput){
		recipeCont.innerHTML=`<h2>Type the meal in the search box...</h2>`;
		return;
	}
	fetchRecipes(searchInput);
});