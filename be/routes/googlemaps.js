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