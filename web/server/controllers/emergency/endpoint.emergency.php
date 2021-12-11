<?php
include __DIR__ .'/db.emergency.controller.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$inputJSON = file_get_contents('php://input');
$input= json_decode( $inputJSON, TRUE ); //convert JSON into array



//The endpoint for getting all emergencies.
if (isset($input['getEmergencies'])) {

    echo json_encode(getAllEmergencies());
   
}


//The endpoint for creating new emergency
if (isset($input['createEmergency'])) {
    $emergencyData = $input['createEmergency'];

    $emergencyId = uniqid();
    $userId = $emergencyData['userId'];
    $emergencyStatus = $emergencyData['emergencyStatus'];
    $description = $emergencyData['description'];
    $issueDate = date('Y-m-d');
    $issueTime = date('H:i:s');
    $location = $emergencyData['location'];


    echo json_encode(createEmergency($emergencyId,$userId,$emergencyStatus,$description,$issueDate,$issueTime,$location,$location));
   
}

