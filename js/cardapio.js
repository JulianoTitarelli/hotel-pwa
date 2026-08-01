let carrinho = [];


const lista = document.getElementById("lista-produtos");
const total = document.getElementById("total");
const totalResumo = document.getElementById("total-resumo");
const quantidadeItens = document.getElementById("quantidade-itens");
const pedido = document.getElementById("pedido");
const busca = document.getElementById("buscar");


// Carrega produtos na tela
function carregarProdutos(filtro = "") {

    lista.innerHTML = "";

    const categorias = [...new Set(produtos.map(p => p.categoria))];


    categorias.forEach(categoria => {

        const itens = produtos.filter(produto => 
            produto.categoria === categoria &&
            produto.nome.toLowerCase().includes(filtro.toLowerCase())
        );


        if(itens.length > 0){

            const titulo = document.createElement("h2");

titulo.className = "categoria";

titulo.innerHTML = `
    🍽️ ${categoria}
    <span>▼</span>
`;


const containerCategoria = document.createElement("div");

containerCategoria.className = "grupo-categoria";


lista.appendChild(titulo);

lista.appendChild(containerCategoria);


          itens.forEach(produto => {

    const div = document.createElement("div");

    div.className = "produto";

              let imagem = "";

switch(produto.categoria){

    case "Cafeteria":

        if(
            produto.nome.toLowerCase().includes("cappuccino") ||
            produto.nome.toLowerCase().includes("frapp") ||
            produto.nome.toLowerCase().includes("affogato")
        ){

            imagem = "img/cappuccino-espresso.webp";

        }else{

            imagem = "img/cafe-espresso.webp";

        }

    break;


    case "Bebidas":

        if(produto.nome.toLowerCase().includes("água") ||
           produto.nome.toLowerCase().includes("agua")){

            imagem = "img/aguas.webp";

        }
        else if(produto.nome.toLowerCase().includes("vinho")){

            imagem = "img/cervejas.webp";

        }
        else{

            imagem = "img/refrigerantes.webp";

        }

    break;


    case "Doces":

        imagem = "img/sobremesas.webp";

    break;

}
case "Salgados":
}

    imagem = "img/salgados.webp";

break;

               div.innerHTML = `

    ${imagem ? `<img src="${imagem}" class="foto-produto" alt="${produto.nome}">` : ""}

    <h3>${produto.nome}</h3>

    <p>
        R$ ${produto.preco.toFixed(2)}
    </p>

    <button onclick="alterarQuantidade(${produto.id}, -1)">
        -
    </button>

    <span id="qtd-${produto.id}">
        ${carrinho.find(i => i.id === produto.id)?.quantidade || 0}
    </span>

    <button onclick="alterarQuantidade(${produto.id}, 1)">
        +
    </button>

`;


               containerCategoria.appendChild(div);

            });
            titulo.onclick = () => {

    containerCategoria.classList.toggle("fechado");

};

        }

    });

}



// Alterar quantidade
function alterarQuantidade(id, quantidade){

    const produto = produtos.find(p => p.id === id);


    let item = carrinho.find(i => i.id === id);


    if(!item){

        item = {
            ...produto,
            quantidade:0
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



// Atualiza carrinho
function atualizarCarrinho(){

    pedido.innerHTML = "";


    let valorTotal = 0;
    let quantidadeTotal = 0;


    if(carrinho.length === 0){

        pedido.innerHTML = 
        "Nenhum item selecionado.";

    }


    carrinho.forEach(item => {


        valorTotal += item.preco * item.quantidade;

quantidadeTotal += item.quantidade;


        pedido.innerHTML += `

        <p>
        ${item.nome} x ${item.quantidade}
        </p>

        `;

    });


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
