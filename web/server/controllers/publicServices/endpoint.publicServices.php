<?php
include __DIR__ .'/db.publicService.controller.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$inputJSON = file_get_contents('php://input');
$input= json_decode( $inputJSON, TRUE ); //convert JSON into array



//The endpoint for getting all public services.
if (isset($input['getPublicServices'])) {

    echo json_encode(getAllPublicServices());
   
}

//The endpoint for creating new public service
if (isset($input['createPublicService'])) {
    $publicServiceData = $input['createPublicService'];

    $serviceID = uniqid();
    $psname = $publicServiceData['name'];
    $pshead = $publicServiceData['head'];
    $hqlocation= $publicServiceData['location'];
   

    echo json_encode(createPublicService($serviceID,$psname,$pshead, $hqlocation));
   
}