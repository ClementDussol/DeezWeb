(() => {
    const app = new Vue({
        el : "#favorites",
        data : {
            favorites : null,
        },
        methods : {
            removeFavorite(item){
                this.favorites.splice(this.favorites.findIndex(f => f.id === item.id), 1);
                localStorage.setItem('favorites', JSON.stringify(this.favorites));
            }
        },
        filters : {
            toMinutes : sec => Math.floor(sec / 60) + "m" + sec % 60 + "s",
        }
    });

    app.favorites = JSON.parse(localStorage.getItem('favorites'));
})();