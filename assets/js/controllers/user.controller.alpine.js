function userDataAlpineWrapper(){
    return {
        users : [],
        currentUser : JSON.parse(localStorage.getItem("userData")),
        async getAllUsers(){
             // Send a request to the server to fetch all user.
      const usersResult = await axios.post("./../../server/controllers/auth/endpoint.auth.php", {
        "users" : "all"
      });

        // If the login fails, show the error message
        if (!loginResult.data.success)
        return (this.loginErrorMessage = loginResult.data.error.message);

        }
    }
}