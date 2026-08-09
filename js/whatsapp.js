async function enviarPedido(){
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
// SALVA PEDIDO NO FIREBASE
// ===========================

try {

    if (!window.firebaseHotel) {

        alert(
            "Não foi possível conectar ao sistema de pedidos. Atualize a página e tente novamente."
        );

        return;
    }


    const {
        db,
        collection,
        addDoc,
        serverTimestamp
    } = window.firebaseHotel;


    const pedidoFirebase = {

        hotel: "Hotel do Baú",

        quarto: quarto,

        itens: comanda.itens,

        observacao: observacao,

        total: Number(total.innerHTML),

        status: "novo",

        criadoEm: serverTimestamp(),

        dataHora: dataHora

    };


    const documento = await addDoc(
        collection(db, "pedidos"),
        pedidoFirebase
    );


    console.log(
        "Pedido salvo no Firebase:",
        documento.id
    );


} catch (erro) {

    console.error(
        "Erro ao salvar pedido:",
        erro
    );


    alert(
        "❌ Não foi possível enviar o pedido para a recepção.\n\nTente novamente."
    );

    return;

}

    // ===========================
    // MONTA WHATSAPP
    // ===========================

    let mensagem =
`
📦 *NOVO PEDIDO*

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
