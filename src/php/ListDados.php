<?php
header("Acess-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
$host = "mysql:host=localhost;dbname=db_catalogo_virtual";
$usuario = "root";
$senha = "";

try {
    $conexao = new PDO($host, $usuario, $senha);

    if(!$conexao){ 
        echo "não foi possivel conectar no BD!";
    }

    $query = $conexao->prepare('Select * from produto order by idproduto asc');

        $query->execute();
        $out = "[";

        while($result = $query->fetch()) {
            if ($out != "[") {
                $out .= ",";
            }
            $out .= '"codigo": "'.$result["idproduto"].'",';
            $out .= '"nome": "'.$result["nome_prod"].'",';
            $out .= '"qtd": "'.$result["quantidade_prod"].'",';
            $out .= '"indicacoes": "'.$result["foto_prod"].'",';
            $out .= '"local": "'.$result["valor_prod"].'",';  
            $out .= '"classe": "'.$result["status_prod"].'",';  
            $out .= '"cien": "'.$result["data_cadastro_prod"].'"';  
        }
        $out .= "]";
        echo $out;
    } catch (Exception $e) {
        echo "erro: ". $e->getMessage();
    
};
