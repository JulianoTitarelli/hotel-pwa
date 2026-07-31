const produtos = [
    {
        nome: "Café",
        preco: 5.00
    },
    {
        nome: "Sanduíche",
        preco: 12.00
    },
    {
        nome: "Refrigerante",
        preco: 6.00
    }
];

let pedido = [];

const cardapio = document.getElementById("cardapio");

produtos.forEach((produto, index) => {

    cardapio.innerHTML += `
        <div class="produto">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarProduto(${index})">
                Adicionar
            </button>
        </div>
    `;

});


function adicionarProduto(index) {

    pedido.push(produtos[index]);

    alert(produtos[index].nome + " adicionado ao pedido!");

}


function enviarPedido() {

    if (pedido.length === 0) {
        alert("Seu pedido está vazio!");
        return;
    }


    let mensagem = "Olá, gostaria de fazer um pedido:%0A%0A";


    let total = 0;


    pedido.forEach(item => {

        mensagem += "- " + item.nome + " R$ " + item.preco.toFixed(2) + "%0A";

        total += item.preco;

    });


    mensagem += "%0ATotal: R$ " + total.toFixed(2);


    let telefone = "5500000000000"; 
    // depois trocamos pelo WhatsApp do hotel


    window.open(
        "https://wa.me/" + telefone + "?text=" + mensagem,
        "_blank"
    );

}
