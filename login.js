let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
let session = JSON.parse(localStorage.getItem("session")) || [];
function login(event){

    event.preventDefault()
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    const dados = cadastros.find(dados => dados.user == user && dados.password == password);

    if (dados) {
        localStorage.setItem("session",JSON.stringify(user));    
        window.location.href = "/agendamento/index.html"
    }
    else {
        console.log("User não encontrado")
    };

};

function cadastro(event) {
    event.preventDefault()
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    cadastros.push({"user": user, "password": password});

    localStorage.setItem("cadastros",JSON.stringify(cadastros));
    console.log("Cadastro com sucesso");
};