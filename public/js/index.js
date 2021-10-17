init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    console.log("workout");
    console.log(workout);
    if (workout) {
      location.search = "?id=" + workout._id;
      console.log("TEST in if workout");
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
      console.log("TEST in else workout");
    }
  }
}

