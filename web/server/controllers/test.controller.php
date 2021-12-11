<?php
include __DIR__ .'/auth/db.auth.controller.php';
include __DIR__ .'/emergency/db.emergency.controller.php';
include __DIR__ .'/publicServices/db.publicService.controller.php';
include __DIR__ .'/respondents/db.respondents.php';
include __DIR__ .'/responseTeams/db.responseTeams.php';
//print_r(checkEmailIsValid("bluefish@gmail.com")) ;

//print_r(checkEmailExist("ronaldnettey360@gmail.com"));

//print_r (validatePassword("rG6*hty6"));

//print_r(login("mandy.love@gmail.com", "Red4%2cJ"));

//print_r(signUp("Tay", "Blue", "tayblue@gmail.com", "tAy*56B7"));

print_r(getAllUsers());

//print_r(createEmergency("F900","111","critical", "Gas explosion", "2021-04-30","12:30 pm", "Linc.estates Hs 21", "Sakumono-Accra"));

//print_r(getAllEmergencies());

//print_r(createPublicService("FS67", "Fire Service", "John Doe", "Taifa"));

// print_r(getAllPublicServices());

// print_r(createRespondents("F21", "", "FS445", "Annie", "White", "Solace", "12:30 pm"));

//print_r(getAllRespondents());

//print_r(createRespondentTeam("MS07", "Falcon"));

//print_r(getAllRespondentTeams());