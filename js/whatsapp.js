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
            observacao = observacaoCampo.value.trim();
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
    // CONFIRMAÇÃO
    // ===========================

    const confirmar = confirm(
`Confirmar pedido?

Quarto: ${quarto}

Total: R$ ${Number(total.innerHTML).toFixed(2)}`
    );


    if(!confirmar){
        return;
    }


    // ===========================
    // BUSCA PEDIDOS JÁ SALVOS
    // ===========================

    let pedidosSalvos = JSON.parse(
        localStorage.getItem("pedidosHotel")
    ) || [];


    // ===========================
    // NÚMERO DA COMANDA
    // ===========================

    let numeroComanda = 1;

    if(pedidosSalvos.length > 0){

        const maiorNumero = Math.max(
            ...pedidosSalvos.map(p => Number(p.numero) || 0)
        );

        numeroComanda = maiorNumero + 1;
    }


    // ===========================
    // DATA E HORÁRIO
    // ===========================

    const agora = new Date();

    const dataHora = agora.toLocaleString(
        "pt-BR"
    );


    // ===========================
    // MONTA COMANDA
    // ===========================

    let comanda = {

        numero: numeroComanda,

        hotel: "Hotel do Baú",

        quarto: quarto,

        dataHora: dataHora,

        itens: [],

        observacao: observacao,

        total: Number(total.innerHTML),

        status: "novo"

    };


    // ===========================
    // PRODUTOS
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
    // SALVA NA LISTA DE PEDIDOS
    // ===========================

    pedidosSalvos.push(comanda);

    localStorage.setItem(
        "pedidosHotel",
        JSON.stringify(pedidosSalvos)
    );
alert(
    "✅ PEDIDO SALVO\n\n" +
    "Site: " + window.location.origin +
    "\nPedidos: " + pedidosSalvos.length
);

    // Mantém também a última comanda
    // para compatibilidade com a página antiga

    localStorage.setItem(
        "ultimaComanda",
        JSON.stringify(comanda)
    );


    // ===========================
    // MONTA WHATSAPP
    // ===========================

    let mensagem =
`━━━━━━━━━━━━━━

📦 *NOVO PEDIDO*

🏨 *Hotel do Baú*

🧾 *Comanda:* #${String(numeroComanda).padStart(3, "0")}

🚪 *Quarto:* ${quarto}

🕒 *Horário:* ${dataHora}

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
