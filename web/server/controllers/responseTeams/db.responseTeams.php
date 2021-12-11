<?php
include __DIR__.'/../../db_connection.php';

function createRespondentTeam($service_ID, $team_name){
    //Make sure entries are not null.
    if (empty($service_ID)) {
        return array("success" => false, "error" => array("message" => "Enter your service ID."));
    } 

    if (empty($team_name)) {
        return array("success" => false, "error" => array("message" => "Enter your team name."));
    } 


  //Insert data entry into database
  global $conn;
  $sql = "INSERT INTO teams (service_ID, team_name) VALUES ('$service_ID', '$team_name')";
  if (mysqli_query($conn, $sql)) {
      return array("success" => true, "message" => "Team successfully created");
    } else {
      return array("success" => false, "error" => array("message" => "Error: " . $sql . "<br>" . mysqli_error($conn) ));
      
  }
}

  function getAllRespondentTeams(){
    //Select all respondent teams from the database
    global $conn;
    $sql = "SELECT * FROM `teams`";

    $result = mysqli_query($conn, $sql);
   
       if (mysqli_num_rows($result) > 0) {
        // output data of each row
        $respondentTeams = [];
            while($row = mysqli_fetch_assoc($result)){

                   array_push($respondentTeams, $row);
            }

        return array("success" => true, "data" =>  $respondentTeams, "message" => "Teams successfully found.");
    
    
        } else {
            
            return array("success" => false, "error" => array("message" => "0 results"));
        
    }
}