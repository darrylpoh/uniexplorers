const db = require('../db/knex');
const axios = require('axios')
require('dotenv').config();

module.exports = app => { 
    app.route('/nearbysearch')
        .get(async (req, res) => {
            // const keyword = req.query.keyword;
            // const lat = req.query.lat;
            // const lng = req.query.lng;
            // const radius = req.query.radius;
            // const type = req.query.type;

            const {keyword, lat, lng, radius, type} = req.query;
            const {GOOGLE_MAPS_API_KEY} = process.env

            let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

            axios.get(url, {
              params: {
                keyword: keyword,
                location: `${lat},${lng}`,
                radius: radius,
                type: type,
                key: GOOGLE_MAPS_API_KEY
              }
            })
            .then((data) => {
              console.log(data)
              res.json(data.data)
            })
            .catch((error) => {
              res.status(500).send()
            })
            
        })
    };