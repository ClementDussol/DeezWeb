(()=>{
    const rootURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";
    const app = new Vue({
        el : "#search",
        data : {
            loading : false,
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
                localStorage.setItem('favorites', JSON.stringify(favorites));
            },
            processFavorites(items){
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                items.forEach(i => i.isFavorite = favorites.find(item => item.id === i.id) ? true : false );
                return items;
            },
            search(){
                this.loading = true;
                fetch(rootURL + this.searchParam + (this.searchOrder ? "&order=" + this.searchOrder : ''))
                    .then(res => res.json())
                    .then(res => {
                        let items = this.processFavorites(res.data);
                        this.nextURL = res.next;
                        this.searchResults = items;
                        this.loading = false;
                    });
            },
            next(){
                if(this.loading) return;
                this.loading = true;
                return fetch("https://cors-anywhere.herokuapp.com/" + this.nextURL)
                    .then(res => res.json())
                    .then(res => {
                        let items = this.processFavorites(res.data);
                        this.nextURL = res.next;
                        this.searchResults = this.searchResults.concat(items);
                        debugger;

                        this.loading = false;
                    });
            }
        },
        filters : {
            toMinutes   : sec  => Math.floor(sec / 60) + ":" + sec % 60,
        },
        created(){
            window.onscroll = () => {
                let d = document.documentElement;
                let offset = d.scrollTop + window.innerHeight;
                let height = d.offsetHeight;

                if (offset >= height) {
                    this.next();
                }
            };
        }
    });
})();