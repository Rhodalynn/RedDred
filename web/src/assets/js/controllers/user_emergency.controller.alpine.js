function userEmergencyDataAlpineWrapper() {
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
  
      // EMERGENCY
      emergencyData: {
  
        location : "",
        emergencyStatus : "Critical",
        address : "",
        description : ""
      },
      emergencies: [],
      emergencyServiceErrorMessage : "",
      async getEmergencies() {
        // Send a request to the server to get all emergencies.
        const emergenciesResult = await axios.post(
          "./../../server/controllers/emergency/endpoint.emergency.php",
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
  
      async createNewEmergency() {
        console.log(JSON.stringify({...{userId : this.currentUser.user_ID},...this.emergencyData}))
        const emergenciesResult = await axios.post(
          "./../../server/controllers/emergency/endpoint.emergency.php",
          {
            createEmergency: {...{userId : this.currentUser.user_ID},...this.emergencyData},
          }
        );
  
        // If failed throw error
        if (!emergenciesResult.data.success){
          console.log(emergenciesResult.data)
          return (this.emergencyServiceErrorMessage =
            emergenciesResult.data.error.message);
        }
          
  
            // If all is successful
            console.log("Successfully created new emergency!")
  
            alert("The report has been sent.");
            location.reload();
      },
      // end of EMERGENCIES
    };
  }
  