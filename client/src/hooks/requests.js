const API_URL = "http://localhost:8000/v1"
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return response.json();
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const FetchedLaunches = await response.json();
  return FetchedLaunches.sort((a,b) => {
    return a.flightNumber - b.flightNumber;
  }); //sort function will give us our launches in ascending order by flight number
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    }
  }
  
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
    try {
      return await fetch(`${API_URL}/launches/${id}`, {
        method: 'delete',
      });
    } catch (error) {
      return {ok: false}
    }

  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};