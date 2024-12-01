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
if (localStorage.getItem("lavanderia")) {
    lavanderia = JSON.parse(localStorage.getItem("lavanderia"));
} else {
    // Salvar o objeto inicial no LocalStorage
    localStorage.setItem("lavanderia", JSON.stringify(lavanderia));
}


// Selecionar o elemento <select> no DOM
let lavanderiaSelect = document.getElementById("lavanderia");

// Iterar sobre as lavanderias e criar opções
Object.values(lavanderia).forEach(element => {
    // Criar elemento <option>
    let option = document.createElement("option");
    option.value = element.nome; // Valor do option
    option.textContent = element.nome; // Texto exibido
    lavanderiaSelect.appendChild(option); // Adicionar ao <select>
});

// Selecionar os elementos do formulário
let form = document.querySelector("form");
let nomeInput = document.getElementById("nome");
let dataInput = document.getElementById("data");
let timeInput = document.getElementById("Time");


// Função para mostrar a mensagem de sucesso
function showMessage(message, duration = 30000) {
    // Criar o elemento da mensagem
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

    // Adicionar a mensagem ao corpo da página
    document.body.appendChild(messageBox);

    // Remover a mensagem após o tempo especificado
    setTimeout(() => {
        messageBox.remove();
    }, duration);
}

// Adicionar evento ao formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que o formulário seja enviado de forma tradicional

    // Capturar os dados do formulário
    let nomeCliente = document.getElementById("nome").value;
    let lavanderiaEscolhida = document.getElementById("lavanderia").value;
    let dataEscolhida = document.getElementById("data").value;
    let horarioEscolhido = document.getElementById("Time").value; // Aqui você captura o horário

    // Verificar se todos os campos foram preenchidos
    if (nomeCliente && lavanderiaEscolhida && dataEscolhida && horarioEscolhido) {
        // Criar o agendamento
        let agendamento = {
            cliente: nomeCliente,
            lavanderia: lavanderiaEscolhida,
            data: dataEscolhida,
            horario: horarioEscolhido,
        };

        // Encontrar a lavanderia escolhida no objeto 'lavanderia' e adicionar o agendamento
        Object.values(lavanderia).forEach(lavanderiaObj => {
            if (lavanderiaObj.nome === lavanderiaEscolhida) {
                lavanderiaObj.agendamentos.push(agendamento);
            }
        });

        // Salvar os agendamentos no LocalStorage para persistência
        localStorage.setItem("lavanderia", JSON.stringify(lavanderia));

        // Exibir a mensagem de sucesso
        let sucesso = document.createElement("div");
        sucesso.textContent = "Agendamento realizado com sucesso!";
        sucesso.style.backgroundColor = "green";
        sucesso.style.color = "white";
        sucesso.style.padding = "10px";
        sucesso.style.marginTop = "20px";
        document.body.appendChild(sucesso);

        // Remover a mensagem de sucesso após 30 segundos
        setTimeout(function() {
            sucesso.remove();
        }, 30000);

        // Atualizar a lista de agendamentos
        exibirAgendamentos();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});
// Mostrar dados salvos no console (apenas para depuração)
console.log("Dados de lavanderia salvos:", JSON.parse(localStorage.getItem("lavanderia")));

// Mostrar os agendamentos salvos
function exibirAgendamentos() {
    let listaAgendamentos = document.getElementById("agendamentos-lista");
    listaAgendamentos.innerHTML = ""; // Limpar lista

    Object.values(lavanderia).forEach((lav) => {
        lav.agendamentos.forEach((agendamento) => {
            let item = document.createElement("li");
            item.textContent = `${agendamento.cliente} - ${lav.nome} - ${agendamento.data} às ${agendamento.horario}`;
            listaAgendamentos.appendChild(item);
        });
    });
}
localStorage.removeItem('agendamentos')