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
`━━━━━━━━━━━━━━

📦 *NOVO PEDIDO*

🏨 *Hotel do Baú*

🚪 *Quarto:* ${quarto}

━━━━━━━━━━━━━━

`;

    });


   mensagem += 
`
━━━━━━━━━━━━━━

📝 *Observações:*

${document.getElementById("observacao").value || "Nenhuma"}

━━━━━━━━━━━━━━

💰 *Total:* R$ ${total.innerHTML}

🙏 Obrigado por escolher o Hotel do Baú!
`;


    const texto = encodeURIComponent(mensagem);


   const confirmar = confirm(
`
Confirmar pedido?

Quarto: ${quarto}

Total:
R$ ${total.innerHTML}
`
);


if(confirmar){

    window.open(
        "https://wa.me/?text=" + texto,
        "_blank"
    );

}

}
