(()=>{
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";
    const app = new Vue({
        el : "#search",
        data : {
            searchParam : "",
            searchOrder : "",
            searchResults : [],
            nextURL : ""
        },
        methods : {
            toggleFavorite(item){
                item.isFavorite = !item.isFavorite;
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if(item.isFavorite){
                    favorites.push(item);
                }else{
                    favorites = favorites.filter(otherItem => otherItem.id != item.id);
                }
                console.log(favorites);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            },
            processFavorites(items){
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                items.forEach(i => i.isFavorite = favorites.find(item => item.id === i.id) ? true : false );
                return items;
            },
            search(){
                fetch(rootURL + this.searchParam + (this.searchOrder ? "&order=" + this.searchOrder : ''))
                    .then(res => res.json())
                    .then(res => {
                        let items = this.processFavorites(res.data);
                        this.nextURL = res.next;
                        this.searchResults = items;
                    });
            },
            next(){
                fetch("https://cors-anywhere.herokuapp.com/" + this.nextURL)
                    .then(res => res.json())
                    .then(res => {
                        let items = this.processFavorites(res.data);
                        this.nextURL = res.next;
                        this.searchResults = items;
                    });
            }
        },
        filters : {
            toMinutes   : sec  => Math.floor(sec / 60) + "m" + sec % 60,
        }
    });
})();