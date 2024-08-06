const {GetAllPlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
    try {
      const planets = await GetAllPlanets();
      res.status(200).json(planets);
    } catch (error) {
        console.error("Error retrieving planets:", error);
        res.status(500).json({ error: "Internal server error" });
    };
    
}

module.exports = {
    httpGetAllPlanets,
}