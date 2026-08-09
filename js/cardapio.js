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
    "Pratos feitos": "img/pf.webp",
    "Doces": "img/sobremesas.webp",
    "Petiscos": "img/petiscos.webp"

};


// ===========================
// ESCOLHE IMAGEM DO PRODUTO
// ===========================

function obterImagem(produto){

    console.log("Categoria:", produto.categoria);
    console.log("Produto:", produto.nome);

    const nome = produto.nome.toLowerCase();


    if(produto.categoria === "Cafeteria"){

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

        if(
            nome.includes("água") ||
            nome.includes("agua")
        ){
            return "img/aguas.webp";
        }


        if(nome.includes("vinho")){
            return "img/cervejas.webp";
        }


        return "img/refrigerantes.webp";
    }


    if(produto.categoria === "Pratos Feitos"){
        return "img/pf.webp";
    }


    if(produto.categoria === "Lanches"){
        return "img/lanche.webp";
    }


    return imagensCategoria[produto.categoria] || "";

}


// ===========================
// CARREGAR PRODUTOS
// ===========================

function carregarProdutos(filtro = ""){


    lista.innerHTML = "";


    const categorias = [
        ...new Set(produtos.map(p => p.categoria))
    ];



    categorias.forEach(categoria => {


        const itens = produtos.filter(produto =>

            produto.categoria === categoria &&

            produto.nome
            .toLowerCase()
            .includes(filtro.toLowerCase())

        );


        if(itens.length === 0) return;



        const titulo = document.createElement("h2");

        titulo.className = "categoria";

       const icones = {
    "Lanches":"🍔",
    "Pratos feitos":"🍛",
    "Salgados":"🥟",
    "Doces":"🍰",
    "Petiscos":"🍟",
    "Bebidas":"🥤",
    "Cafeteria":"☕"
};

titulo.innerHTML = `
${icones[categoria] || "🍽️"} ${categoria}
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


            const itemCarrinho =
            carrinho.find(i=>i.id === produto.id);



            const quantidade =
            itemCarrinho ? itemCarrinho.quantidade : 0;



            const imagem = obterImagem(produto);



            const card = document.createElement("div");

            card.className = "produto";



            card.innerHTML = `


                ${
                    imagem
                    ?
                    `<img src="${imagem}" 
                    class="foto-produto"
                    alt="${produto.nome}">`
                    :
                    ""
                }



                <h3>${produto.nome}</h3>


                <p>
                    R$ ${produto.preco.toFixed(2)}
                </p>



                <div class="controle">

                    <button onclick="alterarQuantidade(${produto.id},-1)">
                        −
                    </button>


                    <span>
                        ${quantidade}
                    </span>


                    <button onclick="alterarQuantidade(${produto.id},1)">
                        +
                    </button>

                </div>


            `;


            container.appendChild(card);


        });


    });


}


// ===========================
// ALTERAR QUANTIDADE
// ===========================

function alterarQuantidade(id, valor){


    const produto = produtos.find(p=>p.id === id);


    let item = carrinho.find(i=>i.id === id);



    if(!item){


        item = {

            ...produto,

            quantidade:0

        };


        carrinho.push(item);


    }



    item.quantidade += valor;



    if(item.quantidade <= 0){


        carrinho =
        carrinho.filter(i=>i.id !== id);


    }



    atualizarCarrinho();


    carregarProdutos(busca.value);


}


// ===========================
// ATUALIZAR CARRINHO
// ===========================

function atualizarCarrinho(){


    let valorTotal = 0;

    let qtdTotal = 0;



    pedido.innerHTML = "";



    if(carrinho.length === 0){


        pedido.innerHTML =
        "Nenhum item selecionado.";


    }else{


        carrinho.forEach(item=>{


            valorTotal +=
            item.preco * item.quantidade;


            qtdTotal += item.quantidade;



            pedido.innerHTML += `

                <p>

                <strong>
                ${item.quantidade}x
                </strong>

                ${item.nome}

                </p>

            `;


        });


    }



    total.innerHTML =
    valorTotal.toFixed(2);


    totalResumo.innerHTML =
    valorTotal.toFixed(2);


    quantidadeItens.innerHTML =
    qtdTotal;


}


// ===========================
// BUSCA
// ===========================

busca.addEventListener("input",()=>{

    carregarProdutos(busca.value);

});


// ===========================
// ABRIR / FECHAR CARRINHO
// ===========================

function abrirCarrinho(){


    const painel =
    document.getElementById("painel-carrinho");


    painel.classList.toggle(
        "painel-fechado"
    );


}


// ===========================
// INICIAR
// ===========================

carregarProdutos();
// ===========================
// ESCONDER CARRINHO AO ROLAR
// ===========================

let ultimaRolagem = window.scrollY;

window.addEventListener("scroll", () => {

    const barra = document.querySelector(".carrinho");

    if (!barra) return;

    const atual = window.scrollY;

    // Sempre mostra no topo da página
    if (atual < 50) {
        barra.classList.remove("carrinho-escondido");
        ultimaRolagem = atual;
        return;
    }

    // Descendo
    if (atual > ultimaRolagem + 10) {
        barra.classList.add("carrinho-escondido");
    }

    // Subindo
    if (atual < ultimaRolagem - 10) {
        barra.classList.remove("carrinho-escondido");
    }

    ultimaRolagem = atual;

});
