<?php
include __DIR__ .'/db.respondents.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$inputJSON = file_get_contents('php://input');
$input= json_decode( $inputJSON, TRUE ); //convert JSON into array

//The endpoint for getting all respondents.
if (isset($input['getAllRespondents'])) {

    echo json_encode(getAllRespondents());
   
}

//The endpoint for creating new respondent
if (isset($input['createRespondent'])) {
    $respondentData = $input['createRespondent'];

    $respondentID = uniqid();
    $emergency_ID = $respondentData[''];
    $branch_ID = $respondentData[''];
    $fname = $respondentData[''];
    $lname = $respondentData[''];
    $team = $respondentData[''];
    $arrivalTime = $respondentData[''];


    echo json_encode(createRespondents($respondentID, $emergency_ID, $branch_ID, $fname, $lname, $team, $arrivalTime));
   
}