import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null); // State to store any errors

  const getPlanets = useCallback(async () => {
    try {
      const fetchedPlanets = await httpGetPlanets();
      setPlanets(fetchedPlanets);
      console.log("fetchedPlanets",fetchedPlanets);
    } catch (error) {
      setError(error); // Store the error if fetching fails
    }
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  useEffect(() => {
    if (planets.length > 0){
      console.log(planets);
      } else {
        console.log("No planets returned")
      }
  }, [planets]);
  

  return planets; // Return both planets and error state
}

export default usePlanets;
