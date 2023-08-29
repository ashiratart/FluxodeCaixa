// Quando o botão "Adicionar" é clicado
document.getElementById("adicionar").addEventListener("click", function() {
    // Pega o código e a quantidade do produto inseridos
    var codigo = document.getElementById("Iproduto").value;
    var quantidade = parseInt(document.getElementById("Iquantidade").value);
    var formData = new FormData();
    formData.append("codigo", codigo);

    // Cria uma requisição para buscar informações do produto
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "buscar_produto.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Obtém informações do produto do servidor
                var produto = JSON.parse(xhr.responseText);

                if (quantidade > 0 && quantidade <= parseInt(produto.quantidade)) {
                    // Calcula as novas quantidades e preço
                    var novoQuantidade = parseInt(produto.quantidade) - quantidade;
                    var novoPreco = produto.preco * quantidade;

                    // Obtém a tabela
                    var tabela = document.getElementById("Ttabela");

                    if (tabela.rows.length <= 1) {
                        // Se a tabela estiver vazia ou só tiver o cabeçalho, cria a primeira linha após o th
                        var newRow = tabela.insertRow(1);

                        // Insere células na nova linha
                        var cell1 = newRow.insertCell(0);
                        cell1.textContent = produto.nome;

                        var cell2 = newRow.insertCell(1);
                        cell2.textContent = quantidade;

                        var cell3 = newRow.insertCell(2);
                        cell3.textContent = "R$" + novoPreco.toFixed(2);
                    } else {
                        // Se a tabela já tiver mais de uma linha, insere uma nova linha após o th
                        var novaLinha = tabela.insertRow(1);
                        var novaCell1 = novaLinha.insertCell(0);
                        novaCell1.textContent = produto.nome;

                        var novaCell2 = novaLinha.insertCell(1);
                        novaCell2.textContent = quantidade;

                        var novaCell3 = novaLinha.insertCell(2);
                        novaCell3.textContent = "R$" + novoPreco.toFixed(2);
                    }

                    // Atualiza a quantidade no banco de dados
                    atualizarQuantidadeBanco(codigo, novoQuantidade);

                    // Limpar campos de adição
                    document.getElementById("Iproduto").value = "";
                    document.getElementById("Iquantidade").value = "";
                } else {
                    console.error("Quantidade inválida.");
                }
            } else {
                console.error("Erro na requisição: " + xhr.statusText);
            }
        }
    };
    xhr.send(formData);
});


            // Função para atualizar a quantidade no banco de dados
            function atualizarQuantidadeBanco(codigo, novaQuantidade) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "atualizar_quantidade.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            console.log("Quantidade atualizada no banco de dados.");
                        } else {
                            console.error("Erro na requisição: " + xhr.statusText);
                        }
                    }
                };
                xhr.send("codigo=" + encodeURIComponent(codigo) + "&quantidade=" + novaQuantidade);
                calcularTotal();
            }

           
            