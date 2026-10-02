import { watchlist, removerDaWatchlist, marcarComoAssistido } from './compartilhado.js';


const contarFilmes = document.querySelector(".watchlist-count");
const watchlistPendentes = document.querySelector(".watchlist-pendentes");
const watchlistAssitido = document.querySelector(".watchlist-assistidos");

function atualizarContadorWatchlist() {
    const filmesPendentes = watchlist.filter((filme) => !filme.assistido)
    if (filmesPendentes.length === 1) {
        contarFilmes.textContent = `${filmesPendentes.length} filme salvo`;
    } else {
        contarFilmes.textContent = `${filmesPendentes.length} filmes salvos`;
    }

}

function criarCardWatchlist(filme) {
    const article = document.createElement('article');
    const posterWrapper = document.createElement('div');
    const overlay = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const spanNota = document.createElement('span');
    const spanAno = document.createElement('span');
    img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    img.alt = `o pôster do filme ${filme.title}`;
    h3.textContent = filme.title;
    overlay.classList.add('card-overlay');
    posterWrapper.classList.add('poster-wrapper');
    posterWrapper.append(img, overlay);
    spanNota.classList.add('nota');
    spanNota.textContent = filme.vote_average.toFixed(1);
    spanAno.classList.add('ano');
    spanAno.textContent = filme.release_date.slice(0, 4);
    const botaoAssistido = document.createElement('button');
    botaoAssistido.type = 'button';
    botaoAssistido.classList.add('botao-assistido');
    const iconeAssistido = document.createElement('i');
    iconeAssistido.classList.add('fa-solid', 'fa-check');
    botaoAssistido.append(iconeAssistido);
    botaoAssistido.onclick = () => {
        marcarComoAssistido(filme.id);
        const seloExistente = article.querySelector('.selo-assistido');
        if (!seloExistente) {
            const selo = document.createElement('span');
            selo.classList.add('selo-assistido');
            selo.textContent = 'Assistido';
            article.append(selo);
        }
        watchlistAssitido.append(article);
        atualizarContadorWatchlist();
    };
    const botaoRemover = document.createElement('button');
    botaoRemover.type = 'button';
    botaoRemover.classList.add('botao-remover');
    const iconeRemover = document.createElement('i');
    iconeRemover.classList.add('fa-solid', 'fa-trash');
    botaoRemover.append(iconeRemover);
    botaoRemover.onclick = () => {
        removerDaWatchlist(filme.id);
        atualizarContadorWatchlist();
        article.remove();
    };
    overlay.append(botaoAssistido, botaoRemover);
    article.append(posterWrapper, h3, spanNota, spanAno);
    if (filme.assistido) {
        const selo = document.createElement('span');
        selo.classList.add('selo-assistido');
        selo.textContent = 'Assistido';
        article.append(selo);
    }
    return article
}

atualizarContadorWatchlist()

watchlist.forEach((filme) => {
    const card = criarCardWatchlist(filme);
    if (filme.assistido === true) {
        watchlistAssitido.append(card)
    } else {
        watchlistPendentes.append(card)
    }
});