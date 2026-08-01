function enviarPedido(){

    if(carrinho.length === 0){

        alert("Adicione algum produto ao pedido.");

        return;

    }


    const quarto = document.getElementById("quarto").value;


    if(quarto === ""){

        alert("Informe o número do quarto.");

        return;

    }


    let mensagem = 
`📦 NOVO PEDIDO

🏨 Hotel do Baú

🚪 Quarto: ${quarto}

`;


    carrinho.forEach(item => {

        mensagem += 
`🍽️ ${item.nome} x ${item.quantidade}
`;

    });


    mensagem += 
`
💰 Total: R$ ${total.innerHTML}
`;


    const texto = encodeURIComponent(mensagem);


    window.open(
        "https://wa.me/?text=" + texto,
        "_blank"
    );

}
