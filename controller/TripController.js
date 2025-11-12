const { trips,GetTripWithDailyCost } = require("../models/TripModel")
const { db } = require("../models/db.js");

const RetrieveAllTrips = (req, res) => {
    const query = "SELECT * FROM Trip";

    res.cookie('TripCreated', destination, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.all(query, [], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Retrieving Trips" });
        }
        return res.status(200).json({
            message: "Trips retrieved successfully",
            data: rows,
            });
        });
    };

const RetrieveTripById = (req, res) => {
    const id = Number(req.params.id);
    const query = `SELECT * FROM Trip WHERE id = '?'`;
    const params = id;

    res.cookie('TripRetrieved', `Trip ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.get(query, params, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error Retrieving Trips" });
        }
        if (!row) {
            return res.status(404).json({ error: "Trip not found" });
        }
        return res.status(200).json({
            message: "Trips retrieved successfully",
            data: row,
            });
        });
    };

const CreateTrip = (req,res) => {
    const{destination,location,continet,language,description,flightCost,
          hotelCost,foodCost,visacost,currencycode}=req.body;

    if(!destination || !location || !continet || !language || !description ||
       !flightCost || !hotelCost || !foodCost || !visacost || !currencycode)

       {
        return res.status(400).json({
            message: 'Missing required fields: destination, location, continet, language',
        });
    }
    
    const query = `INSERT INTO Trip (destination, location, continet, language, description, 
    flightCost, hotelCost, foodCost, visacost, currencycode)

    VALUES ('?', '?', '?', '?', '?', 
              '?', '?', '?', '?', '?')`;

    const params = [destination,location,continet,language,description,flightCost,
                    hotelCost,foodCost,visacost,currencycode];

    res.cookie('TripCreated', `Trip ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({
                message: "Error creating Trip",
                error: err.message
            });   
        }
        return res.status(201).json({
            message: "Trip created successfully",
        });
    });
};        


const DeleteTripById = (req,res) => {
    const id = Number(req.params.id);
    const query = `DELETE FROM Trip WHERE id = '?'`;
    const params = id;

    res.cookie('TripDeleted', `Trip ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    db.run(query, params, function(err){
        if(err){
            console.log(err);
            return  res.status(500).json({
                message: "Error deleting Trip",
                error: err.message
            });   
        }
        if(this.changes === 0){
            return res.status(404).json({
                message: `Trip not found`
            });
        }
        res.status(200).json({
            status: 'success',
            message: `Trip with id ${id} deleted successfully`
        });
    });
}

const UpdateTripById = (req,res) => {
    const id = Number(req.params.id);
    const{destination,location,continet,language,description,flightCost,
          hotelCost,foodCost,visacost,currencycode}=req.body;

    const query = `UPDATE Trip SET 
    destination='?', location='?', continet='?', language='?', 
    description='?', flightCost='?', hotelCost='?', foodCost='?', 
    visacost='?', currencycode='?' WHERE id = '?'`;

    const params = [destination,location,continet,language,description,flightCost,
                    hotelCost,foodCost,visacost,currencycode,id];

    res.cookie('TripDeleted', `Trip ID ${id}`, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    db.run(query, params, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({
                message: "Error updating Trip",
                error: err.message
            });   
        }if(this.changes === 0){
            return res.status(404).json({
                message: `Trip not found`
            });
        }res.status(200).json({
            status: 'success',
            message: `Trip with id ${id} updated successfully`
        });
    });
}


module.exports = {RetrieveAllTrips, CreateTrip, DeleteTripById, UpdateTripById, RetrieveTripById};
