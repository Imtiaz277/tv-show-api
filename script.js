const searchField = document.querySelector("#searchField");
const searchBtn = document.querySelector("#searchBtn");
const container = document.querySelector("#container");
const errorMessage = document.querySelector("#errorMessage");

const api_url = "https://api.tvmaze.com/search/shows";

function displayElements(boolean){
    if(boolean){
        container.classList.remove("hide");
        errorMessage.classList.add("hide");
    }
    else{
        container.classList.add("hide");
        errorMessage.classList.remove("hide");
    }
}

async function searchTv(){

    try{
        displayElements(true);
        let arrShows = await fetch(`${api_url}?q=${searchField.value}`);
        arrShows = await arrShows.json();
        console.log(arrShows);
        
        for(const currShow of arrShows){

            const divItem = document.createElement("div");
            divItem.classList.add("item");

            const divItem__wrapper = document.createElement("div");
            divItem__wrapper.classList.add("item__wrapper");

            const imgItem__image = document.createElement("img");
            if(!currShow.show.image){
                imgItem__image.setAttribute("src", "image-placeholder.jpg"); 
            }
            else{
                imgItem__image.setAttribute("src", currShow.show.image.medium);
            }
            imgItem__image.classList.add("item__image");


            const h4Item__title = document.createElement("h4");
            h4Item__title.textContent = currShow.show.name;
            h4Item__title.classList.add("item__title");

            const pItem__genre = document.createElement("p");
            if(currShow.show.genres.length === 0){
                pItem__genre.textContent = "null";
            }
            else{
                pItem__genre.textContent = currShow.show.genres.join(", ");
            }
            pItem__genre.classList.add("item__genre");

            const pItem__rating = document.createElement("p");
            pItem__rating.textContent = `⭐ ${currShow.show.rating.average}/10`;
            pItem__rating.classList.add("item__rating");



            divItem__wrapper.appendChild(imgItem__image);
            divItem__wrapper.appendChild(h4Item__title);
            divItem__wrapper.appendChild(pItem__genre);
            divItem__wrapper.appendChild(pItem__rating);

            divItem.appendChild(divItem__wrapper);
            container.appendChild(divItem);


            // const img = document.createElement("img");
            // img.setAttribute("src", currShow.show.image.medium);
            // body.appendChild(img);
        }
    }
    catch(e){
        errorMessage.innerHTML = "Uh Oh. Something went wrong\nPlease try again later ☹️";
        displayElements(false);
        console.log(e);
    }

}

searchBtn.addEventListener("click", function(){
    searchBtn.classList.add("btn-pressed");
    setTimeout(function(){
        searchBtn.classList.remove("btn-pressed");
    }, 100);

    // If the element has child or children, remove all the children. This is to remove current result to show new results, rather than showing new results at the bottom of the current result
    if (container.childNodes.length > 0) { container.innerHTML = ""; }
    
    // If the user has input something in the input field
    if(searchField.value){ searchTv(); }
    else{ 
        errorMessage.textContent = "Please input a tv show in the field.";
        displayElements(false); 
    }
});