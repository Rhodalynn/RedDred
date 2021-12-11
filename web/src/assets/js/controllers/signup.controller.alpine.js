function signupDataAlpineWrapper() {
  return {
    isPasswordValid: null,
    isEmailValid: null,
    signupErrorMessage: "",
    userData: {
      email: "",
      password: document.getElementById("passwordField").value,
      fname: "",
      lname: ""
    },
    storeUserData() {
      localStorage.setItem("userData", this.userData);
    },
    clearErrors() {
      this.isPasswordValid = null;
      this.isEmailValid = null;
      this.signupErrorMessage = "";
    },
    async signup() {
      // Clear all errors
      this.clearErrors();

      
      // Send a request to the server to signup user.
      const signupResult = await axios.post("./../../server/controllers/auth/endpoint.auth.php", {
          "signup" : this.userData
        });



      // If the login fails, show the error message
      if (!signupResult.data.success)
        return (this.signupErrorMessage = signupResult.data.error.message);

      //Redirect to signup page.
      location.href = "login.html";
    },
  };
}
