<?php
// Conexão com o banco de dados (substitua os valores pelas suas configurações)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lojoTest";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém o código do produto enviado via POST
    $codigo = $_POST["codigo"];

    // Consulta SQL para buscar o produto com o código especificado
    $sql = "SELECT nome, codigo, quantidade, preco FROM produtos WHERE codigo = ?";
    
    // Prepara a consulta
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $codigo);
    $stmt->execute();
    
    // Obtém o resultado
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Converte o resultado em um array associativo
        $row = $result->fetch_assoc();

        // Retorna o resultado como JSON
        echo json_encode($row);
    } else {
        echo "Produto não encontrado.";
    }

    $stmt->close();
}

$conn->close();
?>
