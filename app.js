// Event listner to check when CheckEmailBtn is clicked
$("#checkEmailBtn").on('click',()=>{
   
    $.ajax({
        url: "../server/controllers/auth/endpoint.auth.php",
        type: "post",
        data: { "checkEmail" : "rnaldnettey@yahoo.com" },
    
        success: function (response) {
            
          // Check if the response is successful
          if (response.success) {
           return  console.log(response)
          } 
          
        //   Else do something
          console.log(response)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(textStatus);
          console.log(errorThrown);

        },
      });
})