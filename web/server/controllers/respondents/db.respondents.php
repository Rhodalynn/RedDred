<?php
include __DIR__.'/../../db_connection.php';
// Make sure entries are not empty.
function createRespondents($emp_ID, $emg_ID, $branch_ID, $fname, $lname, $team, $arrival_time){
    if (empty($emp_ID)) {
        return array("success" => false, "error" => array("message" => "Enter your employee ID."));
    } 

   // if (empty($emg_ID)) {
        //return array("success" => false, "error" => array("message" => "Enter your emergency ID."));
    //} 

    if (empty($branch_ID)) {
        return array("success" => false, "error" => array("message" => "Enter the branch ID."));
    } 

    if (empty($fname)) {
        return array("success" => false, "error" => array("message" => "Enter your first name."));
    } 

    if (empty($lname)) {
        return array("success" => false, "error" => array("message" => "Enter your last name."));
    } 

    if (empty($team)) {
        return array("success" => false, "error" => array("message" => "Enter your team name."));
    } 

    if (empty($arrival_time)) {
        return array("success" => false, "error" => array("message" => "Enter your arrival time."));
    } 

    //Insert data entry into database
    global $conn;
    $sql = "INSERT INTO respondent (emp_ID, emg_ID, branch_ID, fname, lname, team, arrival_time) VALUES ('$emp_ID', '$emg_ID', '$branch_ID', '$fname', '$lname', '$team', '$arrival_time')";
    if (mysqli_query($conn, $sql)) {
        return array("success" => true, "message" => "Respondent successfully created");
      } else {
        return array("success" => false, "error" => array("message" => "Error: " . $sql . "<br>" . mysqli_error($conn) ));
        
    }
} 

function getAllRespondents(){
    //Select all respondents from the database
    global $conn;
    $sql = "SELECT * FROM `respondent`";

    $result = mysqli_query($conn, $sql);
   
       if (mysqli_num_rows($result) > 0) {
        // output data of each row
        $respondents = [];
            while($row = mysqli_fetch_assoc($result)){

                   array_push($respondents, $row);
            }

        return array("success" => true, "data" =>  $respondents, "message" => "Respondents successfully found.");
    
    
        } else {
            
            return array("success" => false, "error" => array("message" => "0 results"));
        
    }
}