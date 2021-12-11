function userDataAlpineWrapper() {
  // DEFAULT
  function getThemeFromLocalStorage() {
    // if user already changed the theme, use it
    if (window.localStorage.getItem("dark")) {
      return JSON.parse(window.localStorage.getItem("dark"));
    }

    // else return their preferences
    return (
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem("dark", value);
  }

  return {
    //   DEFUALT
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      this.dark = !this.dark;
      setThemeToLocalStorage(this.dark);
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
    },
    trick() {
      console.log("Treat");
    },
    closeModal() {
      this.isModalOpen = false;
      this.trapCleanup();
    },
    // end of DEFAULT

    // CURRENT USER
    currentUser: JSON.parse(localStorage.getItem("userData")),
    // end of CURRENT USER

    // USER
    userData: {
      email: "",
      password: document.getElementById("passwordField").value,
      fname: "",
      lname: "",
    },
    users: [],
    userErrorMessage: "",
    async getUsers() {
      // Send a request to the server to login user.
      const usersResult = await axios.post(
        "./../../server/controllers/auth/endpoint.auth.php",
        {
          getUsers: "all",
        }
      );

      console.log(usersResult);

      // If  fails, show the error message
      if (!usersResult.data.success)
        return (this.userErrorMessage = usersResult.data.error.message);

      console.log(usersResult.data);

      //   Updates public services data object with data from server
      this.users = usersResult.data.data;
    },

    async signup() {
      // Send a request to the server to signup user.
      const signupResult = await axios.post(
        "./../../server/controllers/auth/endpoint.auth.php",
        {
          signup: this.userData,
        }
      );

      // If the login fails, show the error message
      if (!signupResult.data.success)
        return (this.signupErrorMessage = signupResult.data.error.message);

      // Successful
      this.closeModal();
    },
    // end of USER
  };
}
