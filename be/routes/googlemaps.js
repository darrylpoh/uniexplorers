const db = require('../db/knex');
const fs = require('fs')
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

      var cache = {}

      const cityGeocodeCache = async (req, res, next) => {
        if (!cache['city_geocode']) {
            let data = fs.readFileSync('json/city_geocode_data.json');
            let city_geocode = JSON.parse(data);
            cache['city_geocode'] = city_geocode;
        }
        
        next();
      }

      const uniGeocodeCache = async (req, res, next) => {
        if (!cache['uni_geocode']) {
            let data = fs.readFileSync('json/uni_geocode_data.json');
            let uni_geocode = JSON.parse(data);
            cache['uni_geocode'] = uni_geocode;
        }
        
        next();
      }

      const cityNearbyCache = async (req, res, next) => {
        if (!cache['city_nearby']) {
            let data = fs.readFileSync('json/city_nearby_data.json');
            let city_nearby = JSON.parse(data);
            cache['city_nearby'] = city_nearby;
        }
        
        next();
      }

      const uniNearbyCache = async (req, res, next) => {
        if (!cache['uni_nearby']) {
            let data = fs.readFileSync('json/uni_nearby_data.json');
            let uni_nearby = JSON.parse(data);
            cache['uni_nearby'] = uni_nearby;
        }
        
        next();
      }

    app.route('/geocode/city/:city')
      .get(cityGeocodeCache, async (req, res) => {
          const {city} = req.params;
          console.log(cache['city_geocode'])
          const geocode_data = cache['city_geocode'][city]

          if (geocode_data) {
            res.json(geocode_data)
          } else {
            res.status(404).json({
              "success": false,
              "message": "city geocode data not found"
            })
          }
          
      })

    app.route('/geocode/university/:university')
      .get(uniGeocodeCache, async (req, res) => {
          const {university} = req.params;
          const geocode_data = cache['uni_geocode'][university]

          if (geocode_data) {
            res.json(geocode_data)
          } else {
            res.status(404).json({
              "success": false,
              "message": "uni geocode data not found"
            })
          }
          
      })

    app.route('/nearby/city/:city')
      .get(cityNearbyCache, async (req, res) => {
          const {city} = req.params;
          const nearby_data = cache['city_nearby'][city]

          if (nearby_data) {
            res.json(nearby_data)
          } else {
            res.status(404).json({
              "success": false,
              "message": "city nearby data not found"
            })
          }
          
      })

    app.route('/nearby/university/:university')
      .get(uniNearbyCache, async (req, res) => {
          const {university} = req.params;

          const nearby_data = cache['uni_nearby'][university]

          if (nearby_data) {
            res.json(nearby_data)
          } else {
            res.status(404).json({
              "success": false,
              "message": "uni nearby data not found"
            })
          }
          
      })

    app.route("/place_photos")
      .get(async (req, res) => {
        const {GOOGLE_MAPS_API_KEY} = process.env
        const {place_id} = req.query

        let url = "https://maps.googleapis.com/maps/api/place/details/json"

        let data = await axios.get(url, {
          params: {
            key: GOOGLE_MAPS_API_KEY,
            placeid: place_id
          }
        })

        let photos = data.data.result.photos
        // console.log(photos)

        for (let idx in photos) {
          let curr_photo = photos[idx]
          curr_photo["size"] = curr_photo.height * curr_photo.width
        }

        let sorted_photos = photos.sort(
          (a, b) => b.size - a.size
        )

        sorted_photos = sorted_photos.slice(0, 5)

        // let image_url = "https://maps.googleapis.com/maps/api/place/photo"
        let photo_references = sorted_photos.map(
          // obj => `${image_url}?photoreference=${obj.photo_reference}`
          obj => obj.photo_reference
        )

        // const images = await Promise.all(
        //   photo_references.map(photo_reference => {
        //     axios.get(image_url, {
        //       params: {
        //         key: GOOGLE_MAPS_API_KEY,
        //         photoreference: photo_reference
        //       }
        //     })
        //     .then(
        //       (resp) => {
        //         let data = resp.data
        //         console.log(data)
        //       }
        //     )
        //   })
        // )

        res.json(photo_references)
      })
  };