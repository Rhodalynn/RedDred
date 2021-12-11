function loginDataAlpineWrapper() {
   

  return {

     //   DEFAULT
    
     toggleTheme() {
       this.dark = !this.dark;
      
     },
     isSideMenuOpen: false,
     toggleSideMenu() {
       this.isSideMenuOpen = !this.isSideMenuOpen;
     },
     closeSideMenu() {
       this.isSideMenuOpen = false;
     },
     isNotificationsMenuOpen: false,
     toggleNotificationsMenu() {
       this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
     },
     closeNotificationsMenu() {
       this.isNotificationsMenuOpen = false;
     },
     isProfileMenuOpen: false,
     toggleProfileMenu() {
       this.isProfileMenuOpen = !this.isProfileMenuOpen;
     },
     closeProfileMenu() {
       this.isProfileMenuOpen = false;
     },
     isPagesMenuOpen: false,
     togglePagesMenu() {
       this.isPagesMenuOpen = !this.isPagesMenuOpen;
     },
     // Modal
     isModalOpen: false,
     trapCleanup: null,
     openModal() {
       this.isModalOpen = true;
       this.trapCleanup = focusTrap(document.querySelector("#modal"));
 
       // Load the public services
       this.getPublicServices()
     },
     trick() {
       console.log("Treat");
     },
     closeModal() {
       this.isModalOpen = false;
       this.trapCleanup();
     },
     // end of DEFAULT

    // LOGIN
    isPasswordValid: null,
    isEmailValid: null,
    loginErrorMessage: "",
    usersErrorMessage: "",
    users : [],
    userData: {
      email: "",
      password: document.getElementById("passwordField")?.value,
    },
    storeUserData(userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    currentUser: JSON.parse(localStorage.getItem("userData")),
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

      if(loginResult.data.data.role == 1) return location.href = "./../";

        
      location.href = "./user_emergency.html";
    },

    async getAllUsers() {
      
      // Send a request to the server to login user.
      const usersResult = await axios.post("./../../server/controllers/auth/endpoint.auth.php", {
          "getAllUsers" : "all"
        });



      // If the fails, show the error message
      if (!usersResult.data.success)
        return (this.usersErrorMessage = usersResult.data.error.message);

      // else, update the users list
      this.users = usersResult.data.data;


      
    },

    // end of LOGIN
  };
}
