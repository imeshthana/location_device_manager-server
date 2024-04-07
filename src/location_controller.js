const createHttpError = require('http-errors')
const mongoose = require('mongoose');
const Location = require('./location_model');
const path = require('path')
const multer = require('multer');

exports.getAllLocations = async (req, res, next) => {
    try {
        const result = await Location.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

exports.addLocation = async (req, res, next) => {
    const { 
        locationName, 
        address, 
        contact,
        devices
    } = req.body

    try {
        if (!locationName || !address || !contact || !devices) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        let product = new Location({ locationName, address, contact, devices });

        product.save()
        .then(savedLocation => {
            res.status(201).json(savedLocation); 
        })
        .catch(error => {
            res.status(500).json({ error: 'Error saving the location' });
        });

    } catch (error) {
        next(error);
    }
};


exports.deleteLocation = async (req, res, next) => {
    const locationId = req.params.id;

    try {
        const result = await Location.findByIdAndDelete(locationId).exec();

        if (!result) {
            throw createHttpError(404, 'Location not found');
        }

        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}


exports.getLocation = async (req, res, next) => {
    const locationId = req.params.id;

    try {
        const result = await Location.findById(locationId).exec();

        if (!result) {
            throw createHttpError(404, 'Location not found');
        }

        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}


exports.updateLocation = async (req, res, next) => {
    const locationId = req.params.id;
    const { 
        locationName, 
        address, 
        contact
    } = req.body

    try {

        if (!locationName || !address || !contact) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        let product = await Location.findById(locationId).exec();

        if (!product) {
            throw createHttpError(404, 'Location not found');
        }

        product.locationName = locationName;
        product.address = address;
        product.contact = contact;

        const result = await product.save();
        res.status(200).send(result);

    } catch (error) {
        next(error)
    }
}


exports.addDeviceToLocation = async (req, res, next) => {
    const locationId = req.params.id;
    const { 
        uniqueNumber, 
        type, 
        status,
        image
    } = req.body

    try {

        if (!uniqueNumber || !type || !status) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        let product = await Location.findById(locationId).exec();

        if (!product) {
            throw createHttpError(404, 'Location not found');
        }

        product.devices.push({ uniqueNumber, type, status,  image});

        const result = await product.save();
        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
};