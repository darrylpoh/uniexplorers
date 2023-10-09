const db = require('../db/knex');
const axios = require('axios')
require('dotenv').config();

module.exports = app => { 
    app.route('/nearbysearch')
        .get(async (req, res) => {
            const keyword = req.query.keyword;
            const lat = req.query.lat;
            const lng = req.query.lng;
            const radius = req.query.radius;
            const type = req.query.type;

            let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${lat}%2C${lng}&radius=${radius}&type=${type}&key=${process.env.GOOGLE_MAPS_API_KEY}`
              axios.get(url)
              .then((data) => {
                res.json(data.data)
              })
              .catch((error) => {
                res.status(500).send()
              })
            
        })
    };