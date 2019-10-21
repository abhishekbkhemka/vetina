<?php
$product = file_get_contents("products.json");
header('Content-type: application/json');
echo $product;
?>