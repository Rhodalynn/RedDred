<?php
include __DIR__.'/../../db_connection.php';

// Make sure entries are not empty
function createPublicService($service_ID, $ps_name, $head, $hq_location){
    if (empty($service_ID)) {
        return array("success" => false, "error" => array("message" => "Enter your service ID."));
    } 

    if (empty($ps_name)) {
        return array("success" => false, "error" => array("message" => "Enter the public service name."));
    } 

    if (empty($head)) {
        return array("success" => false, "error" => array("message" => "Enter the name of the head of the public service."));
    } 

    if (empty($hq_location)) {
        return array("success" => false, "error" => array("message" => "Enter the location of the headquarters."));
    } 


    //Insert data entry into database
    global $conn;
    $sql = "INSERT INTO public_service (service_ID, ps_name, head, hq_location) VALUES ('$service_ID', '$ps_name', '$head', '$hq_location')";
    if (mysqli_query($conn, $sql)) {
        return array("success" => true, "message" => "Public Service successfully created");
      } else {
        return array("success" => false, "error" => array("message" => "Error: " . $sql . "<br>" . mysqli_error($conn) ));
        
    }

}

function getAllPublicServices(){
    //Select all public services from the database
    global $conn;
    $sql = "SELECT * FROM `public_service`";
    $result = mysqli_query($conn, $sql);
   
       if (mysqli_num_rows($result) > 0) {
        // output data of each row
        $publicServices = [];
            while($row = mysqli_fetch_assoc($result)){

                   array_push($publicServices, $row);
            }

        return array("success" => true, "data" =>  $publicServices, "message" => "Public services successfully found.");
    
    
        } else {
            
            return array("success" => false, "error" => array("message" => "0 results"));
        
    }


}

