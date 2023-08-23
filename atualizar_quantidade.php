<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lojoTest";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $codigo = $_POST["codigo"];
    $novaQuantidade = $_POST["quantidade"];

    $sql = "UPDATE produtos SET quantidade = ? WHERE codigo = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $novaQuantidade, $codigo);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Quantidade atualizada no banco de dados.";
    } else {
        echo "Erro ao atualizar a quantidade.";
    }

    $stmt->close();
}

$conn->close();
?>
