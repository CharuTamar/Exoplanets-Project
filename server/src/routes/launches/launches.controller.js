const {getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');


function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req, res) {
    let launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing required launch property'
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid date'
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    let launchId = Number(req.params.id);   //or can convert string to number by using '+' e.g +req.params.id

    // if launchId doesn't exist
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found'
        })
    }


    // if launchId does exist
    let aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted);
} 

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}