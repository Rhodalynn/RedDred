<?php

include __DIR__.'/../../db_connection.php';
//Email Validation
function checkEmailIsValid($email){

//If email is empty return error message.
if (empty($email)) {
    return array("success" => false, "error" => array("message" => "Kindly enter an email."));
  } 
    
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return array("success" => false, "error" => array("message" => "Invalid email format"));

    }

//If email format is correct return
  return array("success" => true, "message" => "Email validated successfully.");
 
}



//Check if an email exists
function checkEmailExist($email){
  // Access the database connection global variable
    global $conn;

    // The sql neeeded to check if the email exists in the database
    $sql = "SELECT `email` FROM `users` WHERE `email` = '".$email."'";

    // Perform the needed query
    $select = mysqli_query($conn,$sql ); 

   
    // Check if a data has been found. If there is, that means the email already exists 
    if(mysqli_num_rows($select) > 0) {
      return array("success" => true, "message" => "This email already exists.");
        }

      return array("success" => false, "error" => array("message" => "Account does not exist"));

}


// Validate user password
function validatePassword ($password){
    //Check is password is empty
if (empty($password)) {
    return array("success" => false, "error" => array("message" => "Enter password."));
  } 

  //Check if password is validated.
  $number = preg_match('@[0-9]@', $password);
  $uppercase = preg_match('@[A-Z]@', $password);
  $lowercase = preg_match('@[a-z]@', $password);
  $specialChars = preg_match('@[^\w]@', $password);
 
  if(strlen($password) < 8 || !$number || !$uppercase || !$lowercase || !$specialChars) {
    
    return array("success" => false, "error" => array("message" => "Password must be at least 8 characters in length and must contain at least one number, one upper case letter, one lower case letter and one special character."));
   
  }
  //Return success of validation.
  return array("success" => true , "message" => "Strong password.");
  
}

//login function
function login ($email, $password){
//Validate password
// $correctPassword = validatePassword($password);
// if(!$correctPassword["success"]){
//     return array("success" => false, "error" => array("message" => $correctPassword["error"]["message"]));
// }

//Check for valid email
$validateEmail = checkEmailIsValid($email);
if(!$validateEmail["success"]){
    return array("success" => false, "error" => array("message" => $validateEmail["error"]["message"]));
}

//Check if email is in database
$emailExistResult = checkEmailExist($email);
if(!$emailExistResult["success"]){
    return array("success" => false, "error" => array("message" => $emailExistResult["error"]["message"]));
 }

//Check if the password belongs to the email
//Run a query to look for email and corresponding password
 // Access the database connection global variable
 global $conn;

 // The sql neeeded to check if the email exists in the database
 $sql = "SELECT * FROM `users` WHERE `email` = '".$email."' AND `password` = '".$password."' ";

 // Perform the needed query
 $select = mysqli_query($conn,$sql ); 


 // Check if a data has been found. If there is, that means the email already exists 
 if(mysqli_num_rows($select) == 0) {
    return array("success" => false, "error" => array("message" => "Invalid username or password."));
     }

   
//Return login successful when everything is correct.
$userData = mysqli_fetch_assoc($select);
return array("success" => true, "data" => $userData,  "message" => "Login successful.");

}

function signUp ($fname, $lname, $email, $password){
    //Make sure fname is not empty
    if (empty($fname)) {
        return array("success" => false, "error" => array("message" => "Enter your first name."));
      } 

    //Make sure lname is not empty
    if (empty($lname)) {
        return array("success" => false, "error" => array("message" => "Enter your last name."));
      } 

    //Make sure email is not empty
    if (empty($email)) {
        return array("success" => false, "error" => array("message" => "Email is required."));
      } 
    //Check if email already exists
    $emailExistResult = checkEmailExist($email);
    if($emailExistResult["success"]){
        return array("success" => false, "error" => array("message" => $emailExistResult["error"]["message"]));
 }
  
    //Check if password has been entered
    if (empty($password)) {
        return array("success" => false, "error" => array("message" => "Password required."));
      } 

    //Validate the password
    $correctPassword = validatePassword($password);
    if(!$correctPassword["success"]){
        return array("success" => false, "error" => array("message" => $correctPassword["error"]["message"]));
    }
    
    //Add user to database
    global $conn;
    $sql = "INSERT INTO users (fname, lname, email, password) VALUES ('$fname', '$lname', '$email', '$password')";
    if (mysqli_query($conn, $sql)) {
        return array("success" => true, "message" => "New record created successfully");
      } else {
        return array("success" => false, "error" => array("message" => "Error: " . $sql . "<br>" . mysqli_error($conn) ));
        
      }

    
}

//Get all users from database
function getAllUsers(){
    //Select all users from the database
    global $conn;
    $sql = "SELECT * FROM `users`";

    $result = mysqli_query($conn, $sql);
   
       if (mysqli_num_rows($result) > 0) {
        // output data of each row
        $users = [];
            while($row = mysqli_fetch_assoc($result)){

                   array_push($users, $row);
            }

        return array("success" => true, "data" =>  $users, "message" => "Users successfully found.");
    
    
        } else {
            
            return array("success" => false, "error" => array("message" => "0 results"));
        
    }
  }


    


