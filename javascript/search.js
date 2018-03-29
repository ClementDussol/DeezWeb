(()=>{
    const rootURL = "https://api.deezer.com/search";
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
                let url = createUrl(rootURL, {q : this.searchParam, order : this.searchOrder});
                fetchJSONP(url).then(res => {
                    let items = this.processFavorites(res.data);
                    this.loading       = false;
                    this.nextURL       = res.next;
                    this.searchResults = items;
                });
            },
            next(){
                if(this.loading) return;
                this.loading = true;
                fetch(this.nextURL).then(res => {
                    let items = this.processFavorites(res.data);
                    this.loading       = false;
                    this.nextURL       = res.next;
                    this.searchResults = this.searchResults.concat(items);
                });
            }
        },
        filters : {
            toMinutes : sec => Math.floor(sec / 60) + ":" + ((sec % 60 + '').length == 1 ? '0' + sec % 60 : sec % 60),
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