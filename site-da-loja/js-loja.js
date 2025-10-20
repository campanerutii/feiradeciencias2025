// Variáveis globais
let cart = [];
let currentPurchase = null;

// Inicializar a biblioteca QRCode
qrcode = qrcode || {};

// Mostrar página específica
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Comprar agora
function buyNow(country) {    
    currentPurchase = [{ country }];
    showPage('checkout');
}


// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    currentPurchase = [...cart];
    showPage('checkout');
}

// Completar compra
function completePurchase() {
    const name = document.getElementById('name').value;
    const snome = document.getElementById('snome').value;

    if (!name || !snome) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (currentPurchase) {
        const countryElement = document.getElementById('purchased-country');

        if (currentPurchase.length === 1) {
            // Compra de um único país
            countryElement.textContent = currentPurchase[0].country;
       }

        // Gerar QR Code
        generateQRCode(currentPurchase);

        showPage('confirmation');

        // Limpar carrinho após compra
        cart = [];
    }
}

// Gerar QR Code
function generateQRCode(purchasedItems) {
    const name = document.getElementById('name').value;
    const snome = document.getElementById('snome').value;

    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';

    // Criar mensagem personalizada
    let message = "Parabéns " + name + " " + snome + "! Você acabou de adquirir o(a) " + purchasedItems[0].country + ". ";
    message += "Apresente esta tela para um membro do grupo no estande do Mundo Conectado e ganhe uma lembrancinha!";

    // Gerar QR Code usando a biblioteca
    try {
        // Tipo numérico (0-9)
        const typeNumber = 0;
        // Nível de correção de erro (L, M, Q, H)
        const errorCorrectionLevel = 'L';
        // Gerar QR Code
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(message);
        qr.make();

        // Criar elemento de imagem para o QR Code
        const qrImage = document.createElement('img');
        qrImage.src = qr.createDataURL(10, 0);
        qrImage.alt = "QR Code da compra";
        qrImage.style.width = '200px';
        qrImage.style.height = '200px';

        // Adicionar a imagem ao DOM
        qrcodeDiv.appendChild(qrImage);
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        qrcodeDiv.innerHTML = '<p style="color: red;">Erro ao gerar QR Code. Recarregue a página.</p>';
    }
}

// Formatar preço
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Inicializar a página
window.onload = function () {

    const paises = [
        { "nome": "Angola", "continente": "África", "capital": "Luanda", "pib": "80.4 bilhões", "população": "37.2 mil", "codigo_iso": "ao", "show_info": true, "pagina": "angola/angola.html"},
        {"nome":"Papua Nova Guiné","continente":"Oceania","capital":"Port Moresby","pib":"23,2 bilhões","população":"9,1 milhões","codigo_iso":"pg", "show_info": true, "pagina": "papua-nova-guine/papua.html"},
        {"nome":"Guatemala","continente":"América Central","capital":"Cidade da Guatemala","pib":"86,2 bilhões","população":"18,5 milhões","codigo_iso":"gt", "show_info": true, "pagina": "guatemala/guatemala.html"},
        { "nome": "Brasil", "continente": "América", "capital": "Brasília", "pib": "2.1 trilhões", "população": "203 milhões", "codigo_iso": "br" },
        { "nome": "Estados Unidos", "continente": "América", "capital": "Washington, D.C.", "pib": "27 trilhões", "população": "336 milhões", "codigo_iso": "us" },
        { "nome": "Canadá", "continente": "América", "capital": "Ottawa", "pib": "2.1 trilhões", "população": "40 milhões", "codigo_iso": "ca" },
        { "nome": "México", "continente": "América", "capital": "Cidade do México", "pib": "1.8 trilhões", "população": "128 milhões", "codigo_iso": "mx" },
        { "nome": "Argentina", "continente": "América", "capital": "Buenos Aires", "pib": "650 bilhões", "população": "46 milhões", "codigo_iso": "ar" },
        { "nome": "Chile", "continente": "América", "capital": "Santiago", "pib": "350 bilhões", "população": "19 milhões", "codigo_iso": "cl" },
        { "nome": "Colômbia", "continente": "América", "capital": "Bogotá", "pib": "430 bilhões", "população": "52 milhões", "codigo_iso": "co" },
        { "nome": "Peru", "continente": "América", "capital": "Lima", "pib": "250 bilhões", "população": "34 milhões", "codigo_iso": "pe" },
        { "nome": "Venezuela", "continente": "América", "capital": "Caracas", "pib": "100 bilhões", "população": "29 milhões", "codigo_iso": "ve" },
        { "nome": "Uruguai", "continente": "América", "capital": "Montevidéu", "pib": "80 bilhões", "população": "3.5 milhões", "codigo_iso": "uy" },
        { "nome": "Cuba", "continente": "América", "capital": "Havana", "pib": "100 bilhões", "população": "11 milhões", "codigo_iso": "cu" },
        { "nome": "Haiti", "continente": "América", "capital": "Porto Príncipe", "pib": "20 bilhões", "população": "11.6 milhões", "codigo_iso": "ht" },
        { "nome": "Alemanha", "continente": "Europa", "capital": "Berlim", "pib": "4.5 trilhões", "população": "83 milhões", "codigo_iso": "de" },
        { "nome": "França", "continente": "Europa", "capital": "Paris", "pib": "3.7 trilhões", "população": "65 milhões", "codigo_iso": "fr" },
        { "nome": "Reino Unido", "continente": "Europa", "capital": "Londres", "pib": "3.6 trilhões", "população": "68 milhões", "codigo_iso": "gb" },
        { "nome": "Itália", "continente": "Europa", "capital": "Roma", "pib": "2.5 trilhões", "população": "59 milhões", "codigo_iso": "it" },
        { "nome": "Espanha", "continente": "Europa", "capital": "Madri", "pib": "1.8 trilhões", "população": "48 milhões", "codigo_iso": "es" },
        { "nome": "Rússia", "continente": "Europa", "capital": "Moscou", "pib": "2.2 trilhões", "população": "145 milhões", "codigo_iso": "ru" },
        { "nome": "Países Baixos", "continente": "Europa", "capital": "Amsterdã", "pib": "1.3 trilhões", "população": "18 milhões", "codigo_iso": "nl" },
        { "nome": "Suíça", "continente": "Europa", "capital": "Berna", "pib": "950 bilhões", "população": "9 milhões", "codigo_iso": "ch" },
        { "nome": "Suécia", "continente": "Europa", "capital": "Estocolmo", "pib": "700 bilhões", "população": "10 milhões", "codigo_iso": "se" },
        { "nome": "Polônia", "continente": "Europa", "capital": "Varsóvia", "pib": "900 bilhões", "população": "38 milhões", "codigo_iso": "pl" },
        { "nome": "Luxemburgo", "continente": "Europa", "capital": "Luxemburgo", "pib": "89 bilhões", "população": "660 mil", "codigo_iso": "lu" },
        { "nome": "Albânia", "continente": "Europa", "capital": "Tirana", "pib": "18 bilhões", "população": "2.8 milhões", "codigo_iso": "al" },
        { "nome": "China", "continente": "Ásia", "capital": "Pequim", "pib": "18 trilhões", "população": "1.41 bilhões", "codigo_iso": "cn" },
        { "nome": "Índia", "continente": "Ásia", "capital": "Nova Délhi", "pib": "4.2 trilhões", "população": "1.43 bilhões", "codigo_iso": "in" },
        { "nome": "Japão", "continente": "Ásia", "capital": "Tóquio", "pib": "4.2 trilhões", "população": "124 milhões", "codigo_iso": "jp" },
        { "nome": "Coreia do Sul", "continente": "Ásia", "capital": "Seul", "pib": "2 trilhões", "população": "52 milhões", "codigo_iso": "kr" },
        { "nome": "Arábia Saudita", "continente": "Ásia", "capital": "Riad", "pib": "1.1 trilhões", "população": "36 milhões", "codigo_iso": "sa" },
        { "nome": "Mongólia", "continente": "Ásia", "capital": "Ulan Bator", "pib": "15 bilhões", "população": "3.4 milhões", "codigo_iso": "mn" },
        { "nome": "Turquia", "continente": "Ásia", "capital": "Ancara", "pib": "1 trilhão", "população": "85 milhões", "codigo_iso": "tr" },
        { "nome": "Nigéria", "continente": "África", "capital": "Abuja", "pib": "500 bilhões", "população": "223 milhões", "codigo_iso": "ng" },
        { "nome": "África do Sul", "continente": "África", "capital": "Pretória", "pib": "405 bilhões", "população": "61 milhões", "codigo_iso": "za" },
        { "nome": "Egito", "continente": "África", "capital": "Cairo", "pib": "400 bilhões", "população": "112 milhões", "codigo_iso": "eg" },
        { "nome": "Quênia", "continente": "África", "capital": "Nairóbi", "pib": "120 bilhões", "população": "55 milhões", "codigo_iso": "ke" },
        { "nome": "Etiópia", "continente": "África", "capital": "Adis Abeba", "pib": "150 bilhões", "população": "126 milhões", "codigo_iso": "et" },
        { "nome": "Camarões", "continente": "África", "capital": "Yaoundé", "pib": "50 bilhões", "população": "28 milhões", "codigo_iso": "cm" },
        { "nome": "Austrália", "continente": "Oceania", "capital": "Camberra", "pib": "1.7 trilhões", "população": "26 milhões", "codigo_iso": "au" },
        { "nome": "Nova Zelândia", "continente": "Oceania", "capital": "Wellington", "pib": "250 bilhões", "população": "5.2 milhões", "codigo_iso": "nz" },
        { "nome": "Papua-Nova Guiné", "continente": "Oceania", "capital": "Port Moresby", "pib": "35 bilhões", "população": "10 milhões", "codigo_iso": "pg" },
        { "nome": "Fiji", "continente": "Oceania", "capital": "Suva", "pib": "5 bilhões", "população": "950 mil", "codigo_iso": "fj" },
        { "nome": "Samoa", "continente": "Oceania", "capital": "Apia", "pib": "1.2 bilhões", "população": "225 mil", "codigo_iso": "ws" },
        { "nome": "Tonga", "continente": "Oceania", "capital": "Nucualofa", "pib": "550 milhões", "população": "106 mil", "codigo_iso": "to" },
        { "nome": "Ilhas Marshall", "continente": "Oceania", "capital": "Majuro", "pib": "280 milhões", "população": "42 mil", "codigo_iso": "mh" }     
]
;


    let html = '';

    paises.forEach(pais => {

        btn = "";

        if (pais.show_info) {
            btn = `<a href="${pais.pagina}" class="action-btn buy-btn info">Informaçoes do País</a>`;
        }


        html += `
                <div class="country-card" data-continent="${pais.continente}" data-name="${pais.nome}">
                    <div class="flag-container">
                        <img src="https://flagcdn.com/w640/${pais.codigo_iso}.png" alt="${pais.nome}">
                    </div>
                    <div class="country-info">
                        <h3>${pais.nome}</h3>
                        <p><span>Continente:</span> ${pais.continente}</p>
                        <p><span>Capital:</span> ${pais.capital}</p>
                        <p><span>População:</span> ${pais.população}</p>
                        <div class="price">$ ${pais.pib}</div>
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn buy-btn" onclick="buyNow('${pais.nome}')">Comprar Agora</button>
                        ${btn}
                    </div>
                </div>`;

    });

    this.document.querySelector('.countries-grid').innerHTML = html;

};

// Filtro por continentes
document.querySelectorAll('.continent-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        document.querySelectorAll('.continent-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Adiciona a classe active ao botão clicado
        button.classList.add('active');

        const continent = button.getAttribute('data-continent');
        const continentTitle = document.querySelector('.continent-title');

        // Atualiza o título conforme o continente selecionado
        if (continent === 'all') {
            continentTitle.textContent = 'Todos os Países';
        } else {
            continentTitle.textContent = `Países da ${continent}`;
        }

        // Mostra os países conforme o continente selecionado
        const countryCards = document.querySelectorAll('.country-card');

        countryCards.forEach(card => {
            if (continent === 'all' || card.getAttribute('data-continent') === continent) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});