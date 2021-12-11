function publicServicesDataAlpineWrapper() {
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

    // PUBLIC SERVICE
    publicServiceData: {},
    publicServices: [],
    async getPublicServices() {
      // Send a request to the server to login user.
      const publicServicesResult = await axios.post(
        "./../../server/controllers/publicServices/endpoint.publicServices.php",
        {
          getPublicServices: "all",
        }
      );

      console.log(publicServicesResult);

      // If the login fails, show the error message
      if (!publicServicesResult.data.success)
        return (this.publicServicesErrorMessage =
          publicServicesResult.data.error.message);

      console.log(publicServicesResult.data);

      //   Updates public services data object with data from server
      this.publicServiceData = publicServicesResult.data.data;
    },

    createNewPublicService() {},
    // end of PUBLIC SERVICE
  };
}
