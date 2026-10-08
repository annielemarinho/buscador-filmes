# Buscador de Filmes

Aplicação web que reúne diversos títulos vindos da API do TMDB e permite visualizar informações sobre eles, além de organizá-los em uma seção de Watchlist. Criada apenas com HTML, CSS e JavaScript puro, sem frameworks.

## Deploy

O projeto está publicado no GitHub Pages e pode ser acessado pelo link abaixo:

[Ver projeto online](https://annielemarinho.github.io/buscador-filmes/)

## Funcionalidades

- Busca de filmes por nome
- Filtro por gênero
- Modal de detalhes do filme
- Adicionar e remover filmes da Watchlist
- Marcar filmes como assistidos
- Visualizar onde assistir

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript
- TMDB API
- LocalStorage
- Git e GitHub
- GitHub Actions
- GitHub Pages
- Font Awesome

## Como executar localmente

### 1. Clonar repositório

```bash
    git clone https://github.com/annielemarinho/buscador-filmes.git
    cd buscador-filmes
```

### 2. Configuração da API Key (TMDB)

1. Crie uma conta no site do TMDB
2. Acesse as configurações da sua conta e vá até a seção **API**
3. Solicite sua **API Key (v3 auth)**
4. Copie o arquivo `js/compartilhado.example.js` e renomeie a cópia para `js/compartilhado.js`
5. Abra `js/compartilhado.js`
6. Na primeira linha, substitua `SUA_CHAVE_AQUI` pela sua chave do TMDB

> **Aviso:** o arquivo `js/compartilhado.js` está no `.gitignore` e não deve ser commitado nem enviado para um repositório público.

### 3. Execução do projeto

Para garantir que os módulos JavaScript funcionem corretamente, abra o projeto utilizando um servidor local (evite abrir o arquivo diretamente no navegador via protocolo `file://`).

1. No VS Code, instale a extensão **Live Server** (caso ainda não tenha).
2. Clique com o botão direito sobre o arquivo `index.html`.
3. Selecione a opção **Open with Live Server**.
4. O projeto será aberto automaticamente no seu navegador padrão.

## Aprendizados

Durante o desenvolvimento deste projeto, pratiquei:

- Consumo de APIs utilizando `fetch` com `async/await`
- Manipulação dinâmica do DOM com JavaScript
- Organização do código utilizando módulos ES
- Persistência de dados no navegador com `localStorage`
- Configuração de automações e deploy utilizando GitHub Actions

## Melhorias futuras

- Exibir uma mensagem quando a Watchlist ou a busca não tiver resultados
- Refinar a responsividade para dispositivos móveis
- Implementar paginação dos resultados
- Remover logos de serviços de streaming duplicados no modal
- Explorar avaliações de outras fontes, como IMDb ou Rotten Tomatoes 

## Créditos

Este projeto utiliza a API do TMDB para obter dados e imagens de filmes, mas não é endossado nem certificado pelo TMDB.

As informações sobre disponibilidade em serviços de streaming são fornecidas pelo JustWatch por meio dos dados disponibilizados pela API do TMDB.