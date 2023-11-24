function loadCategoriesFetch(url){
    fetch(url)
    .then(res=>res.json())
    .then(data=>loadCategoriesButton(data.data));
    
}

function loadCategoriesButton(dataCategories){
    let categoriesTitleContainer = document.getElementById("categories-title-container");
    
    for(let dataCategory of dataCategories){
        let div = document.createElement("div");
        div.innerHTML=`
            <button type="button" class="btn btn-primary" onclick="loadVideoFetch('${dataCategory.category_id}')">${dataCategory.category}</button>
        `;
        categoriesTitleContainer.appendChild(div);
        // console.log(dataCategory.category)
    }
    
}




url="https://openapi.programming-hero.com/api/videos/categories"
loadCategoriesFetch(url);