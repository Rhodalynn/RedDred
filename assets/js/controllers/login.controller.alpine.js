function loginDataAlpineWrapper() {
  return {
    isPasswordValid: null,
    isEmailValid: null,
    loginErrorMessage: "",
    userData: {
      email: "",
      password: document.getElementById("passwordField").value,
    },
    storeUserData() {
      localStorage.setItem("userData", this.userData);
    },
    clearErrors() {
      this.isPasswordValid = null;
      this.isEmailValid = null;
      this.loginErrorMessage = "";
    },
    async login() {
      // Clear all errors
      this.clearErrors();

      this.isEmailValid = true;
      this.isPasswordValid = false;

      // Send a request to the server to login user.
      const loginResult = await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/todos/1",
      });

      // If the login fails, show the error message
      if (!loginResult.success)
        return (this.loginErrorMessage = "Some error message.");

      // else, store user data and move to the dashboard
      this.storeUserData();

      location.href = "/";
    },
  };
}
