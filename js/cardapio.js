let carrinho = [];


const lista = document.getElementById("lista-produtos");
const total = document.getElementById("total");
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


                div.innerHTML = `

                    <h3>${produto.nome}</h3>

                    <p>
                        R$ ${produto.preco.toFixed(2)}
                    </p>


                    <button onclick="alterarQuantidade(${produto.id}, -1)">
                        -
                    </button>


                    <span id="qtd-${produto.id}">
                        0
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


    if(carrinho.length === 0){

        pedido.innerHTML = 
        "Nenhum item selecionado.";

    }


    carrinho.forEach(item => {


        valorTotal += item.preco * item.quantidade;


        pedido.innerHTML += `

        <p>
        ${item.nome} x ${item.quantidade}
        </p>

        `;

    });


    total.innerHTML = valorTotal.toFixed(2);


}



// Pesquisa
busca.addEventListener("input", () => {

    carregarProdutos(busca.value);

});


// Inicia página
carregarProdutos();
