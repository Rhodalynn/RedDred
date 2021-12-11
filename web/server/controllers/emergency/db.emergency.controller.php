<?php
include __DIR__.'/../../db_connection.php';

global $conn;

// Make sure entries are not empty
function createEmergency ($emg_ID, $user_ID, $emg_status, $description, $issue_date, $issue_time, $address, $location){
    if (empty($emg_ID)) {
        return array("success" => false, "error" => array("message" => "Enter your emergency ID."));
    } 

    if (empty($user_ID)) {
        return array("success" => false, "error" => array("message" => "Enter your user ID."));
    } 

    if (empty($emg_status)) {
        return array("success" => false, "error" => array("message" => "Enter your status."));
    } 

    if (empty($description)) {
        return array("success" => false, "error" => array("message" => "Enter your description of the emergency."));
    } 


    if (empty($issue_date)) {
        return array("success" => false, "error" => array("message" => "Enter date."));
    } 

    if (empty($issue_time)) {
        return array("success" => false, "error" => array("message" => "Enter your address."));
    } 
    //Make this automatic
    if (empty($address)) {
        return array("success" => false, "error" => array("message" => "Enter your time of entry ."));
    } 
    
    if (empty($location)) {
        return array("success" => false, "error" => array("message" => "Select your location."));
    } 

    //Insert data entry into database
    global $conn;
    $sql = "INSERT INTO emergency (emg_ID, user_ID, emg_status, description, issue_date, issue_time, address, location) VALUES ('$emg_ID', '$user_ID', '$emg_status', '$description', '$issue_date','$issue_time', '$address', '$location')";
    if (mysqli_query($conn, $sql)) {
        return array("success" => true, "message" => "Emergency successfully created");
      } else {
        return array("success" => false, "error" => array("message" => "Error: " . $sql . "<br>" . mysqli_error($conn) ));
        
    }

}

function getAllEmergencies(){
    //Select all emergencies from the database
    global $conn;
    $sql = "SELECT * FROM `emergency`";

    $result = mysqli_query($conn, $sql);
   
       if (mysqli_num_rows($result) > 0) {
        // output data of each row
        $emergencies = [];
            while($row = mysqli_fetch_assoc($result)){

                   array_push($emergencies, $row);
            }

        return array("success" => true, "data" =>  $emergencies, "message" => "Emergencies successfully found.");
    
    
        } else {
            
            return array("success" => false, "error" => array("message" => "0 results"));
        
    }


}


