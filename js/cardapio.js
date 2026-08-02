let carrinho = [];

const lista = document.getElementById("lista-produtos");
const total = document.getElementById("total");
const totalResumo = document.getElementById("total-resumo");
const quantidadeItens = document.getElementById("quantidade-itens");
const pedido = document.getElementById("pedido");
const busca = document.getElementById("buscar");

// ===========================
// IMAGENS DAS CATEGORIAS
// ===========================

const imagensCategoria = {
    "Salgados": "img/salgados.webp",
    "Lanches": "img/lanche.webp",
    "Pratos Feitos": "img/pf.webp",
    "Doces": "img/sobremesas.webp",
    "Petiscos": "img/petiscos.webp"
};

// ===========================
// ESCOLHE A IMAGEM
// ===========================

function obterImagem(produto){

    if(produto.categoria === "Cafeteria"){

        const nome = produto.nome.toLowerCase();

        if(
            nome.includes("cappuccino") ||
            nome.includes("frapp") ||
            nome.includes("affogato")
        ){
            return "img/cappuccino-espresso.webp";
        }

        return "img/cafe-espresso.webp";
    }


    if(produto.categoria === "Bebidas"){

        const nome = produto.nome.toLowerCase();

        if(nome.includes("água") || nome.includes("agua")){
            return "img/aguas.webp";
        }

        if(nome.includes("vinho")){
            return "img/cervejas.webp";
        }

        return "img/refrigerantes.webp";
    }


    return imagensCategoria[produto.categoria] || "";
}

// ===========================
// CARREGA PRODUTOS
// ===========================

function carregarProdutos(filtro = ""){

    lista.innerHTML = "";

    const categorias = [...new Set(produtos.map(p => p.categoria))];

    categorias.forEach(categoria=>{

        const itens = produtos.filter(produto=>

            produto.categoria === categoria &&
            produto.nome.toLowerCase().includes(filtro.toLowerCase())

        );

        if(itens.length === 0) return;

        const titulo = document.createElement("h2");

        titulo.className = "categoria";

        titulo.innerHTML = `
            🍽️ ${categoria}
            <span>▼</span>
        `;

        const container = document.createElement("div");

        container.className = "grupo-categoria";

        lista.appendChild(titulo);
        lista.appendChild(container);

        titulo.onclick = ()=>{

            container.classList.toggle("fechado");

        };

        itens.forEach(produto=>{

            const quantidade =
                carrinho.find(i=>i.id===produto.id)?.quantidade || 0;

            const imagem = obterImagem(produto);

            const card = document.createElement("div");

            card.className = "produto";

            card.innerHTML = `

                ${
                    imagem
                    ? `<img src="${imagem}" class="foto-produto" alt="${produto.nome}">`
                    : ""
                }

                <h3>${produto.nome}</h3>

                <p>
                    R$ ${produto.preco.toFixed(2)}
                </p>

                <button onclick="alterarQuantidade(${produto.id},-1)">−</button>

                <span id="qtd-${produto.id}">
                    ${quantidade}
                </span>

                <button onclick="alterarQuantidade(${produto.id},1)">+</button>

            `;

            container.appendChild(card);

        });

    });

}
// ===========================
// ALTERA QUANTIDADE
// ===========================

function alterarQuantidade(id, quantidade){

    const produto = produtos.find(p => p.id === id);

    let item = carrinho.find(i => i.id === id);

    if(!item){

        item = {
            ...produto,
            quantidade: 0
        };

        carrinho.push(item);

    }

    item.quantidade += quantidade;

    if(item.quantidade <= 0){

        carrinho = carrinho.filter(i => i.id !== id);

    }

    atualizarCarrinho();

    carregarProdutos(busca.value);

}

// ===========================
// ATUALIZA CARRINHO
// ===========================

function atualizarCarrinho(){

    let valorTotal = 0;
    let quantidadeTotal = 0;

    pedido.innerHTML = "";

    if(carrinho.length === 0){

        pedido.innerHTML = "Nenhum item selecionado.";

    }else{

        carrinho.forEach(item=>{

            valorTotal += item.preco * item.quantidade;
            quantidadeTotal += item.quantidade;

            pedido.innerHTML += `
                <p>
                    <strong>${item.quantidade}x</strong>
                    ${item.nome}
                </p>
            `;

        });

    }

    total.innerHTML = valorTotal.toFixed(2);
    totalResumo.innerHTML = valorTotal.toFixed(2);
    quantidadeItens.innerHTML = quantidadeTotal;

}



// Pesquisa
busca.addEventListener("input", () => {

    carregarProdutos(busca.value);

});


// Inicia página
carregarProdutos();
function abrirCarrinho(){

    const painel = document.getElementById("painel-carrinho");

    painel.classList.toggle("painel-fechado");

}
