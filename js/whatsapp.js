function enviarPedido(){

    if(carrinho.length === 0){

        alert("Adicione algum produto ao pedido.");
        return;

    }


    // ===========================
    // QUARTO
    // ===========================

    const quarto =
        document.getElementById("quarto").value;


    // ===========================
    // OBSERVAÇÃO
    // ===========================

    const observacaoCampo =
        document.getElementById("observacao");


    let observacao = "Nenhuma";


    if(observacaoCampo){

        if(observacaoCampo.value.trim() !== ""){

            observacao =
                observacaoCampo.value.trim();

        }

    }


    // ===========================
    // VERIFICA QUARTO
    // ===========================

    if(quarto === ""){

        alert("Informe o número do quarto.");
        return;

    }


    // ===========================
    // MONTA COMANDA
    // ===========================

    let comanda = {

        hotel: "Hotel do Baú",

        quarto: quarto,

        itens: [],

        observacao: observacao,

        total: Number(total.innerHTML)

    };


    // ===========================
    // ADICIONA OS PRODUTOS
    // ===========================

    carrinho.forEach(item => {

        comanda.itens.push({

            nome: item.nome,

            quantidade: item.quantidade,

            preco: Number(item.preco),

            subtotal:
                Number(item.preco) *
                Number(item.quantidade)

        });

    });


    // ===========================
    // GUARDA A COMANDA
    // ===========================

    localStorage.setItem(
        "ultimaComanda",
        JSON.stringify(comanda)
    );


    // ===========================
    // MONTA WHATSAPP
    // ===========================

    let mensagem =
`━━━━━━━━━━━━━━

🍽️ *Pedido Hotel do Baú*

🚪 *Quarto:* ${quarto}

━━━━━━━━━━━━━━

`;


    carrinho.forEach(item => {

        mensagem +=
`🍽️ ${item.nome}

Quantidade: ${item.quantidade}

`;

    });


    mensagem +=
`━━━━━━━━━━━━━━

📝 *Observações:*

${observacao}

━━━━━━━━━━━━━━

💰 *Total:* R$ ${Number(total.innerHTML).toFixed(2)}

🙏 Obrigado por escolher o Hotel do Baú! Assim que estiver pronto avisamos você`;


    // ===========================
    // CONFIRMAÇÃO
    // ===========================

    const confirmar = confirm(
`Confirmar pedido?

Quarto: ${quarto}

Total:
R$ ${Number(total.innerHTML).toFixed(2)}`
    );


    if(!confirmar){

        return;

    }


    // ===========================
    // ENVIA WHATSAPP
    // ===========================

    const texto =
        encodeURIComponent(mensagem);


    window.open(

        "https://wa.me/5516991180878?text=" + texto,

        "_blank"

    );

}


// ===========================
// BOTÃO FIXO WHATSAPP
// ===========================

function criarWhatsappRecepcao(){

    const botao =
        document.createElement("a");


    botao.href =
        "https://wa.me/5516991180878?text=Olá,%20gostaria%20de%20falar%20com%20a%20recepção%20do%20Hotel%20do%20Baú";


    botao.target = "_blank";


    botao.innerHTML = "💬";


    botao.className =
        "whatsapp-fixo";


    document.body.appendChild(botao);

}


document.addEventListener(
    "DOMContentLoaded",
    criarWhatsappRecepcao
);
