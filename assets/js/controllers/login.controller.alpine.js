function loginDataAlpineWrapper() {
  return {
    isPasswordValid: null,
    isEmailValid: null,
    loginErrorMessage: "",
    userData: {
      email: "",
      password: document.getElementById("passwordField").value,
    },
    storeUserData(userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    getUserData(){
      this.userData = JSON.parse(localStorage.getItem("userData"))
    },
    clearErrors() {
      this.isPasswordValid = null;
      this.isEmailValid = null;
      this.loginErrorMessage = "";
    },
    async login() {
      // Clear all errors
      this.clearErrors();

      
      // Send a request to the server to login user.
      const loginResult = await axios.post("./../../server/controllers/auth/endpoint.auth.php", {
          "login" : this.userData
        });



      // If the login fails, show the error message
      if (!loginResult.data.success)
        return (this.loginErrorMessage = loginResult.data.error.message);

      // else, store user data and move to the dashboard
      this.storeUserData(loginResult.data.data);


      location.href = "./../";
    },
  };
}
