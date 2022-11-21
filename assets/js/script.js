// ""Brigitte veut un site :
// -> Une journée

// Sur les série, parce qu'elle est fan.
// Lien (API) avec toutes ses séries + infos. 
// Palette de couleur : libre.
// Site adapté, facile etc

// On voit toutes ses séries -> au clic -> fenêtre sur 
//    la même page avec la description de la souris. Avec des étoiles vide au dessus du film, cliquable.
//    5 étoiles etc etc, qui s'allument, tout simplement.

// Tout ça sur une seule et unique page.
// Site responsive.""


// Fonction connexion à l api


async function allShows(){
    let showsFetch = await fetch("https://api.tvmaze.com/shows");
    if( showsFetch.ok === true){
        let showsJson = await showsFetch.json(); 
        return showsJson
    }
}

async function viewShows(showsJson){

// Créer le container
    let showsContainer = document.createElement("section");

// Inserer container sur le DOM
    document.querySelector("main").appendChild(showsContainer);

// Boucle induviduelle par show
    showsJson.forEach(show => {

        // Créer articles
        const showArticle = document.createElement("article");
        const showImg = document.createElement("img");
        const showH2 = document.createElement("h2");
        const showH2Text = document.createTextNode(show.name);
        const showGenres = show.genres;

        showImg.setAttribute("src", show.image.original);

        // Inserer architecture dans Container
        showsContainer.appendChild(showArticle);
        showArticle.appendChild(showImg);
        showH2.appendChild(showH2Text);
        showArticle.appendChild(showH2);
        
        

        // Créer le modal  name summary genres status rating episodes"
        const articleModal = document.createElement("div");
        const articleH3 = document.createElement("h3");
        const articleH3Text = document.createTextNode(show.name);
        const articleSummary = document.createElement("p");
        articleSummary.innerHTML = show.summary
        // const articleSummaryText = document.createTextNode(show.summary);
        const articleGenres = document.createElement("span");
        const articleGenresText = document.createTextNode("Genres : "+show.genres)
        const articleStatus = document.createElement("span");
        const articleStatusText = document.createTextNode("Status : "+show.status);
        const articleRating = document.createElement("span");
        const articleRatingText = document.createTextNode("Rating : "+show.rating);
        const articleLink = document.createElement("a");
        articleLink.setAttribute("href", "https://www.tvmaze.com/shows/" + show.id +"/" +show.name + "/episodes");
        const articleLinkText = document.createTextNode("Lien vers les épisodes.");
        


        showsContainer.appendChild(articleModal);
        articleH3.appendChild(articleH3Text);
        // articleSummary.appendChild(articleSummaryText);
        articleStatus.appendChild(articleStatusText);
        articleRating.appendChild(articleRatingText);
        articleLink.appendChild(articleLinkText);
        articleModal.classList.add("modal");
        articleModal.classList.add("displayNone");
        articleModal.appendChild(articleH3);
        articleModal.appendChild(articleSummary);
        // articleModal.appendChild(articleGenres);
        show.genres.forEach(genre => {
            // console.log(genre)
            const genreSpan = document.createElement("span");
            const genreText = document.createTextNode(genre);

            genreSpan.appendChild(genreText);
            articleModal.appendChild(genreSpan);
        })
        articleModal.appendChild(articleStatus);
        articleModal.appendChild(articleRating);
        articleModal.appendChild(articleLink);

        showArticle.addEventListener("click", () => {
            if(!articleModal.classList.contains("displayNone")){
                articleModal.classList.add("displayNone");
                return
            }
// marche pas ici //////////////////////////////////////////////////////////////////////////////////
            for ( i = 0; i < show.length; i++){
                articleModal[i].classList.add("displaytest");
                alert("test")
            }
// /////////////////////////////////////////////////////////////////////////////////////////////////
            articleModal.classList.toggle("displayNone");
        });

        // console.log(show.genres)
    })
}

allShows().then(showsJson => viewShows(showsJson));
