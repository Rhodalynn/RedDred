<?php
include __DIR__ .'/db.responseTeams.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$inputJSON = file_get_contents('php://input');
$input= json_decode( $inputJSON, TRUE ); //convert JSON into array

//The endpoint for getting all respondent team.
if (isset($input['getEmergencyResponseTeams'])) {

    echo json_encode(getAllRespondentTeams());
   
}

//The endpoint for creating new respondent team.
if (isset($input['createEmergencyResponseTeam'])) {
    $respondentTeamsData = $input['createEmergencyResponseTeam'];

    $serviceID = $respondentTeamsData['serviceId'];
    $team_name = $respondentTeamsData['teamName'];
    
    echo json_encode(createRespondentTeam($serviceID, $team_name));
   
}