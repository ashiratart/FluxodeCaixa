function add() {
    var nome = document.getElementById("nome").value;
    var codigo = document.getElementById("code").value;
    var preco = document.getElementById("preco").value;
    var quante = document.getElementById("quante").value;

    var produto = {
        nome: nome,
        codigo: codigo,
        preco: preco,
        quantidade: quante
    };

    fetch("insert.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([produto]),
    })
    .then(response => response.text())
    .then(data => {
        // Lidar com a resposta do servidor
        console.log(data); // Pode ser uma mensagem de sucesso ou erro do servidor

        // Limpar campos de entrada
        document.getElementById("nome").value = "";
        document.getElementById("code").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("quante").value = "";

        // Exibir mensagem de confirmação
        var mensagem = document.createElement("span");
        mensagem.textContent = data;
        document.body.appendChild(mensagem);

        // Remover a mensagem após alguns segundos (opcional)
        setTimeout(function() {
            document.body.removeChild(mensagem);
        }, 3000); // Remove a mensagem após 3 segundos
    })
    .catch(error => {
        // Lidar com erros, se necessário
        console.error('Erro:', error);
    });
}
