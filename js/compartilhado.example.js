export const apiKey = "SUA_CHAVE_AQUI";
export const urlBase = "https://api.themoviedb.org/3";

export let watchlist;

const dadosSalvos = localStorage.getItem('watchlist');
if (dadosSalvos) {
    watchlist = JSON.parse(dadosSalvos);
} else {
    watchlist = [];
}

export function adicionarNaWatchlist(filme) {
    watchlist.push({
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        vote_average: filme.vote_average,
        release_date: filme.release_date,
        assistido: false
    });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

export function removerDaWatchlist(filmeId) {
    const index = watchlist.findIndex((item) => item.id === filmeId);
    watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

export function marcarComoAssistido(filmeId) {
    const filme = watchlist.find((item) => item.id === filmeId);
    filme.assistido = true;
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}