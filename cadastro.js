
        // Função para calcular e exibir o total da coluna 3
        function calcularTotal() {
            var tabela = document.getElementById("Ttabela");
            var linhas = tabela.getElementsByTagName("tr");
            var total = 0;
    
            for (var i = 1; i < linhas.length; i++) { // Começamos do índice 1 para pular o cabeçalho
                var valorCelula = linhas[i].getElementsByTagName("td")[2].textContent;
                total += parseFloat(valorCelula.replace("R$", ""));
            }
    
            // Formata o total como moeda (real)
            var totalFormatado = "R$" + total.toFixed(2);
    
            // Exibe o total no elemento vendashj
            document.getElementById("Tvendashj").value = totalFormatado;
        }
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
        
                                // Obtém a tabela e insere uma nova linha
                                var tabela = document.getElementById("Ttabela");
                                var newRow = tabela.insertRow();
        
                                // Insere células na nova linha
                                var cell1 = newRow.insertCell(0);
                                cell1.textContent = produto.nome;
        
                                var cell2 = newRow.insertCell(1);
                                cell2.textContent = quantidade;
        
                                var cell3 = newRow.insertCell(2);
                                cell3.textContent = "R$" + novoPreco.toFixed(2);
        
                                // Atualiza a quantidade no banco de dados
                                atualizarQuantidadeBanco(codigo, novoQuantidade);
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

           
            
