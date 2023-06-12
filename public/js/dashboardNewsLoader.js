function loadMore(){

    
    let button = document.getElementById('loadMore');

    // {{!-- Number of Articles to show --}}

    let articlesToShow = 6;

    let articles = document.getElementsByClassName("newsContainerDashboard");

    // {{!-- Looping through the articles --}}

    for(let i=0;i<=articles.length;i++){

        if(i<articlesToShow){
            articles[i].style.display = "block"
        }
        else{

       articles[i].style.display = "none";
        }
    }
}
