// Objeto com as informações das lavanderias
let lavanderia = {
    lava_e_leva: {
        nome: "Lava e leva",
        endereço: "AV. norte, 455",
        agendamentos: [],
    },
    seconds: {
        nome: "60 Segundos",
        endereço: "AV. Miguel Arrais, 4",
        agendamentos: [],
    },
    lavo: {
        nome: "Lavô",
        endereço: "AV. Cruz Cabugá, 55",
        agendamentos: [],
    },
    omo: {
        nome: "Lavanderia omo",
        endereço: "AV. Conde da Boa Vista, 15",
        agendamentos: [],
    }
};

// Função para exibir agendamentos na tela
function exibirAgendamentos() {
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Limpa os agendamentos exibidos antes de adicionar novos
    let agendamentosDiv = document.getElementById('agendamentos-lista');
    agendamentosDiv.innerHTML = "";

    agendamentos.forEach((agendamento, index) => {
        let div = document.createElement("div");
        div.classList.add("agendamento");
        div.innerHTML = `
            <p><strong>Nome:</strong> ${agendamento.nome}</p>
            <p><strong>Lavanderia:</strong> ${agendamento.lavanderia}</p>
            <p><strong>Data:</strong> ${agendamento.data}</p>
            <p><strong>Horário:</strong> ${agendamento.horario}</p>
            <button onclick="removerAgendamento(${index})">Remover</button>
        `;
        agendamentosDiv.appendChild(div);
    });
}

// Verificar se já existem dados salvos no LocalStorage
if (!localStorage.getItem("lavanderia")) {
    // Salvar o objeto inicial no LocalStorage
    localStorage.setItem("lavanderia", JSON.stringify(lavanderia));
}

// Selecionar o elemento <select> no DOM
let lavanderiaSelect = document.getElementById("lavanderia");

// Iterar sobre as lavanderias e criar opções
Object.values(lavanderia).forEach(element => {
    let option = document.createElement("option");
    option.value = element.nome;
    option.textContent = element.nome;
    lavanderiaSelect.appendChild(option);
});

// Selecionar os elementos do formulário
let form = document.querySelector("form");
let nomeInput = document.getElementById("nome");
let dataInput = document.getElementById("data");
let timeInput = document.getElementById("Time");

// Função para mostrar a mensagem de sucesso
function showMessage(message, duration = 3500) {
    let messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.style.position = "fixed";
    messageBox.style.bottom = "20px";
    messageBox.style.right = "20px";
    messageBox.style.backgroundColor = "#4caf50";
    messageBox.style.color = "white";
    messageBox.style.padding = "10px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    messageBox.style.zIndex = "1000";

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, duration);
}

// Adicionar evento ao formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    let nomeCliente = nomeInput.value;
    let lavanderiaEscolhida = lavanderiaSelect.value;
    let dataEscolhida = dataInput.value;
    let horarioEscolhido = timeInput.value;

    // Verificar se todos os campos foram preenchidos
    if (nomeCliente && lavanderiaEscolhida && dataEscolhida && horarioEscolhido) {
        let agendamento = {
            nome: nomeCliente,
            lavanderia: lavanderiaEscolhida,
            data: dataEscolhida,
            horario: horarioEscolhido,
        };

        // Recuperar agendamentos do LocalStorage
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(agendamento);

        // Salvar os agendamentos no LocalStorage
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

        showMessage("Agendamento realizado com sucesso!");

        // Atualizar a lista de agendamentos
        exibirAgendamentos();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});

// Função para remover agendamento
function removerAgendamento(index) {
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    // Atualizar a lista de agendamentos
    exibirAgendamentos();
}

// Mostrar os agendamentos ao carregar a página
document.addEventListener("DOMContentLoaded", exibirAgendamentos);
