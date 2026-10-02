import { apiKey, urlBase, watchlist, adicionarNaWatchlist, removerDaWatchlist } from './compartilhado.js';

const urlPopulares = `${urlBase}/movie/popular?api_key=${apiKey}&language=pt-BR`
const urlGeneros = `${urlBase}/genre/movie/list?api_key=${apiKey}&language=pt-BR`
const listaFilmes = document.querySelector("section")
const dialog = document.querySelector('dialog')
const botaoFechar = dialog.querySelector('#fechar');
const linksCategorias = document.querySelectorAll('nav ul li a');
const inputBusca = document.querySelector('#buscar');
const botaoPesquisar = document.querySelector('.busca button');

let listaGeneros = [];

function criarCard(filme) {
    const article = document.createElement('article');
    const posterWrapper = document.createElement('div');
    const overlay = document.createElement('div');
    const icone = document.createElement('i');
    const botao = document.createElement('button');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const spanNota = document.createElement('span');
    const spanAno = document.createElement('span');
    posterWrapper.classList.add('poster-wrapper');
    botao.classList.add('botao-info');
    overlay.classList.add('card-overlay');
    botao.append(icone);
    overlay.append(botao);
    posterWrapper.append(img, overlay);
    icone.classList.add('fa-solid', 'fa-circle-info');
    img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    img.alt = `o pôster do filme ${filme.title}`;
    h3.textContent = filme.title;
    spanNota.classList.add('nota');
    spanNota.textContent = filme.vote_average.toFixed(1);
    spanAno.classList.add('ano');
    spanAno.textContent = filme.release_date.slice(0, 4);
    article.append(posterWrapper, h3, spanNota, spanAno);

    article.addEventListener('click', () => {
        abrirModal(filme);
    })

    return article
}

async function abrirModal(filme) {
    const imgModal = dialog.querySelector('img');
    const h2Modal = dialog.querySelector('h2');
    const pModal = dialog.querySelector('p');
    const notaModal = dialog.querySelector('span.nota');
    const anoModal = dialog.querySelector('span.ano');
    const generosModal = dialog.querySelector('span.generos');
    const botaoWatchlist = dialog.querySelector('#watchlist');
    const ondeAssistirModal = dialog.querySelector('.onde-assistir');
    const urlProvedores = `${urlBase}/movie/${filme.id}/watch/providers?api_key=${apiKey}`;
    const respostaProvedores = await fetch(urlProvedores);
    const dadosProvedores = await respostaProvedores.json();
    ondeAssistirModal.innerHTML = ""
    if (dadosProvedores.results.BR) {
        const providers = dadosProvedores.results.BR;
        const todosProvedores = (providers.flatrate || []).concat(providers.rent || [], providers.buy || []);
        todosProvedores.forEach(provedor => {
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${provedor.logo_path}`;
            img.alt = `Logo do provedor ${provedor.provider_name}`;
            ondeAssistirModal.append(img);
        });
    }
    imgModal.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    imgModal.alt = `o pôster do filme ${filme.title}`;
    h2Modal.textContent = filme.title;
    pModal.textContent = filme.overview;
    notaModal.textContent = filme.vote_average.toFixed(1);
    anoModal.textContent = filme.release_date.slice(0, 4);
    generosModal.textContent = filme.genre_ids.map((id) => {
        const genero = listaGeneros.find((g) => g.id === id);
        return genero.name;
    }).join(', ');
    const jaEstaNaLista = watchlist.some((item) => item.id === filme.id);
    if (jaEstaNaLista) {
        botaoWatchlist.textContent = "Remover da Watchlist";
    } else {
        botaoWatchlist.textContent = "Adicionar à Watchlist";
    }
    botaoWatchlist.onclick = () => {
        alternarWatchlist(filme, botaoWatchlist);
    };
    dialog.showModal();
}

function alternarWatchlist(filme, botaoWatchlist) {
    const jaEstaNaLista = watchlist.some((item) => item.id === filme.id);
    if (jaEstaNaLista === true) {
        removerDaWatchlist(filme.id);
        botaoWatchlist.textContent = "Adicionar à Watchlist";
    } else {
        adicionarNaWatchlist(filme);
        botaoWatchlist.textContent = "Remover da Watchlist";
    }
}

botaoFechar.addEventListener('click', () => {
    dialog.close()
});

linksCategorias.forEach((link) => {
    link.addEventListener('click', (evento) => {
        evento.preventDefault();
        const generoId = link.dataset.generoId;
        buscarPorGenero(generoId);
    });
});

botaoPesquisar.addEventListener('click', () => {
    const texto = inputBusca.value;
    buscarPorTexto(texto);
});

function exibirWatchlist() {
    listaFilmes.innerHTML = "";
    watchlist.forEach((filme) => {
        const card = criarCard(filme);
        listaFilmes.append(card)
    })
}

async function buscarPopulares() {
    try {
        const resposta = await fetch(urlPopulares);
        const dados = await resposta.json();
        dados.results.forEach((filme) => {
            const card = criarCard(filme);
            listaFilmes.append(card);
        });
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

async function buscarGeneros() {
    try {
        const resposta = await fetch(urlGeneros);
        const dados = await resposta.json();
        listaGeneros = dados.genres;
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

async function buscarPorGenero(generoId) {
    try {
        const generoUrl = `${urlBase}/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${generoId}`;
        const resposta = await fetch(generoUrl);
        const dados = await resposta.json();
        listaFilmes.innerHTML = "";
        dados.results.forEach((filme) => {
            const card = criarCard(filme);
            listaFilmes.append(card);
        });
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

async function buscarPorTexto(texto) {
    try {
        const textoUrl = `${urlBase}/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(texto)}`;
        const resposta = await fetch(textoUrl);
        const dados = await resposta.json();
        listaFilmes.innerHTML = "";
        dados.results.forEach((filme) => {
            const card = criarCard(filme);
            listaFilmes.append(card);
        });
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

buscarGeneros();
buscarPopulares();