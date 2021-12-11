function defaultData() {
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

    // DASHBOARD
    currentUser: JSON.parse(localStorage.getItem("userData")),
    emergencies: [],
    emergencyServiceErrorMessage: "",
    async getEmergencies() {
      // Send a request to the server to get all emergencies.
      const emergenciesResult = await axios.post(
        "./../server/controllers/emergency/endpoint.emergency.php",
        {
          getEmergencies: "all",
        }
      );

      console.log(emergenciesResult);

      // If  fails, show the error message
      if (!emergenciesResult.data.success)
        return (this.emergencyServiceErrorMessage =
          emergenciesResult.data.error.message);

      console.log(emergenciesResult.data);

      //   Updates emergencies data object with data from server
      this.emergencies = emergenciesResult.data.data;
    },

    publicServices: [],
    publicServiceErrorMessage: "",
    async getPublicServices() {
      // Send a request to the server to login user.
      const publicServicesResult = await axios.post(
        "./../server/controllers/publicServices/endpoint.publicServices.php",
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
      this.publicServices = publicServicesResult.data.data;
    },

    emergencyResponseTeams: [],
    emergencyResponseErrorMessage: "",
    async getEmergencyTeams() {
      // Send a request to the server to get all emergencies.
      const emergencyResponseResult = await axios.post(
        "./../server/controllers/responseTeams/endpoint.responseTeams.php",
        {
          getEmergencyResponseTeams: "all",
        }
      );

      console.log(emergencyResponseResult);

      // If  fails, show the error message
      if (!emergencyResponseResult.data.success)
        return (this.emergencyResponseErrorMessage =
          emergencyResponseResult.data.error.message);

      console.log(emergencyResponseResult.data);

      //   Updates emergencies response team data object with data from server
      this.emergencyResponseTeams = emergencyResponseResult.data.data;
    },

    async load() {
      await this.getEmergencies();
      await this.getEmergencyTeams();
      await this.getPublicServices();
    },

    // end of DASHBOARD
  };
}
