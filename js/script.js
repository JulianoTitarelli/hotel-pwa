const produtos = [

    {
        categoria: "Cafeteria",
        nome: "Café expresso Dolce Gusto 50ml",
        descricao: "",
        preco: 9.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Café coado",
        descricao: "",
        preco: 8.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Café expresso Dolce Gusto Lungo",
        descricao: "",
        preco: 9.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Café expresso Dolce Gusto Matinal",
        descricao: "",
        preco: 9.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Café expresso Dolce Gusto Doppio",
        descricao: "",
        preco: 9.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Espresso Latte Nesquik",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Espresso Latte KitKat",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Espresso Au Lait",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Espresso Latte Tea Chai",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Espresso Latte Língua de Gato",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Cappuccino Tradicional",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Cappuccino Caramelo Salgado",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Cappuccino Doce de Leite",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Cappuccino Brigadeiro",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Cappuccino Canela",
        descricao: "",
        preco: 11.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Cappuccino com borda de creme de avelã",
        descricao: "",
        preco: 14.00,
        ativo: true
    },

    {
        categoria: "Cafeteria",
        nome: "Frappé",
        descricao: "",
        preco: 14.00,
        ativo: true
    },

   {
    categoria: "Cafeteria",
    nome: "Affogato",
    descricao: "",
    preco: 12.00,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Salgado assado tortinha de costela",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Salgado assado esfiha de carne",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Salgado assado esfiha de frango",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Salgado assado ghirella de pizza",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Salgado assado presunto e queijo",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Salgado assado X-burguer com bacon",
    descricao: "",
    preco: 10.00,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Croissant pizza",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Croissant frango com requeijão",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Croissant de chocolate",
    descricao: "",
    preco: 7.50,
    ativo: true
},

{
    categoria: "Salgados",
    nome: "Croissant de doce de leite",
    descricao: "",
    preco: 7.50,
    ativo: true
}

];

let pedido = [];

const cardapio = document.getElementById("cardapio");

function mostrarCategoria(categoria) {

    const cardapio = document.getElementById("cardapio");

    cardapio.innerHTML = "";


    produtos.forEach((produto, index) => {

        if (produto.categoria === categoria && produto.ativo) {

            cardapio.innerHTML += `
                <div class="produto">

                    <h3>${produto.nome}</h3>

                    <p>${produto.descricao}</p>

                    <p>
                        R$ ${produto.preco.toFixed(2)}
                    </p>

                    <button onclick="adicionarProduto(${index})">
                        Adicionar
                    </button>

                </div>
            `;

        }

    });

}

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


mostrarCategoria("Cafeteria");
