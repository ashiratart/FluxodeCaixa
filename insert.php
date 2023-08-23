<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lojoTest";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true); // Receber os produtos do JavaScript

foreach ($data as $produto) {
    $nome = $produto['nome'];
    $codigo = $produto['codigo'];
    $preco = $produto['preco'];
    $quantidade = $produto['quantidade'];

    $sql = "INSERT INTO produtos (nome, codigo, preco, quantidade) VALUES ('$nome', '$codigo', '$preco', '$quantidade')";

    if ($conn->query($sql) !== TRUE) {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    } else {
        echo "Inserção bem-sucedida!";
    }
}
$conn->close();
?>
