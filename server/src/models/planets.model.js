const fs = require("fs");
const path = require('path');
const {parse} = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet (planet){
    return (planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6);
}

//planets DATA loaded from CSV file
function loadPlanetsData (){
  return new Promise((resolve, reject) => { // promise so that data is handled asyncronously
  fs.createReadStream(path.join(__dirname, "..", "..","data","kepler_data.csv")) // read stream created to read csv file
   .pipe(parse({ // data is broken up into different columns
     comment:'#',
     columns: true,
   })) 
  .on("data", async(data) => { 
    if (isHabitablePlanet(data)){ // if data is that of a habitable planet it is saved
     await savePlanet(data); // habitable planets are saved there are 8 habitable planets which matches the requirements of isHabitable planet function
    } // savePlanet function is called saving the data from CSV file to savePlanet function
  })
  .on("error", (err) => {
    console.log(err);
    reject(err);
  })
  .on("end", async () => { // once the data is found it is assigned to a variable and console logged
    const countPlanetsFound = (await GetAllPlanets()).length; // at this point GetAllPlanets.length is 8 which represents 8 habitable planets
    console.log(`${countPlanetsFound} number of planets found`);
    resolve(); // the promise is fulfilled as data is returned.
  });
});
};

async function GetAllPlanets() {
  const foundPlanets = await planets.find({}, {'_id': 0, '__v': 0}); //searches through the planets model and finds all planets 
  console.log("planets found", foundPlanets);
  return foundPlanets;
}

async function savePlanet(planet){
  try {
    await planets.updateOne({ // the update one function is set to update one field where the keplerName matches planet.kepler_name
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true, // if nothing is found matching the keplerNames then a new field is inserted
    });
  } catch (error) {
    console.error(`Could not save planet ${error}`);
  }
  
}

module.exports = {
    loadPlanetsData,
    GetAllPlanets,
}