     //função final
     function calcular() {
        var tabela = document.getElementById("Ttabela");
        var linhas = tabela.getElementsByTagName("tr");
        var total = 0;
    
        for (var i = 1; i < linhas.length; i++) { // Começamos do índice 1 para pular o cabeçalho
            var valorCelula = linhas[i].getElementsByTagName("td")[2].textContent;
            total += parseFloat(valorCelula.replace("R$", ""));
        }
    
        // Formata o total como moeda (real)
        var totalFormatado = total.toFixed(2);
    
        // Exibe o total no elemento vendashj
        document.getElementById("totalValue").value = totalFormatado;
    }
    
    function final() {
        calcularTotal(); // Chama a função para calcular o total
    
        var valorTotal = document.getElementById("totalValue").value;
        document.getElementById("totalValue").value = valorTotal;
    
        // Faz a requisição usando Fetch
        fetch("compra.php", {
            method: "POST",
            body: new URLSearchParams({
                totalValue: valorTotal
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Compra processada com sucesso!");
                // Redirecionar para a página de sucesso ou realizar outra ação
            } else {
                console.error("Erro ao processar a compra.");
            }
        })
        .catch(error => {
            console.error("Erro na requisição: " + error);
        });
    }
    
