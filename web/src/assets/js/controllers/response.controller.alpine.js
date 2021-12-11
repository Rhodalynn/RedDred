function emergencyResponseDataAlpineWrapper() {
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

    // CURRENT USER
    currentUser: JSON.parse(localStorage.getItem("userData")),
    // end of CURRENT USER

    // EMERGENCY
    emergencyResponseTeamData: {
      serviceId : "",
      teamName : ""
    },
    emergencyResponseTeams: [],
    emergencyResponseErrorMessage: "",
    publicServices : [],
    respondents : [],
    respondentsErrorMessage: "",

    async getEmergencyTeams() {
      // Send a request to the server to get all emergencies.
      const emergencyResponseResult = await axios.post(
        "./../../server/controllers/responseTeams/endpoint.responseTeams.php",
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

    async createNewEmergencyResponseTeam() {
      console.log(JSON.stringify(this.emergencyResponseTeamData))
      const emergencyResponseTeamResult = await axios.post(
        "./../../server/controllers/responseTeams/endpoint.responseTeams.php",
        {
          createEmergencyResponseTeam: this.emergencyResponseTeamData,
        }
      );

      // If failed throw error
      if (!emergencyResponseTeamResult.data.success) {
        console.log(emergencyResponseTeamResult.data);
        return (this.emergencyResponseErrorMessage =
          emergencyResponseTeamResult.data.error.message);
      }

      // If all is successful
      console.log("Successfully created new emergency response team!");

      // Update the list
      this.getEmergencyTeams()

      this.closeModal();
    },

    async getAllRespondents() {
      // Send a request to the server to get all respondents.
      const respondentsResult = await axios.post(
        "./../../server/controllers/respondents/endpoint.respondents.php",
        {
          getAllRespondents: "all",
        }
      );

      console.log(respondentsResult);

      // If  fails, show the error message
      if (!respondentsResult.data.success)
        return (this.respondentsErrorMessage =
          respondentsResult.data.error.message);

      console.log(respondentsResult.data);

      //   Updates respondents data object with data from server
      this.respondents = respondentsResult.data.data;
    },
    // end of EMERGENCIES

    //OUTLIER
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
        return console.log(
          publicServicesResult.data.error.message);

      //   Updates public services data object with data from server
      this.publicServices = publicServicesResult.data.data;
    },
  };
}
