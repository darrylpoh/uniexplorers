const axios = require('axios')

module.exports = app => {
    app.route('/summary/:search')
        .get(async (req, res) => {
            const url = "https://en.wikipedia.org/w/api.php"
            const search = req.params.search;

            axios.get(url, 
                {
                    params: {
                        format: "json",
                        action: "query",
                        prop: "extracts",
                        exintro: '',
                        explaintext: '',
                        redirects: 1,
                        titles: search
                    }
                }
            )
            .then(
                (resp) => {
                    res.json(Object.values(resp.data.query.pages)[0].extract)
                }
            )
            .catch(err => res
                .status(404)
                .json({
                    success: false,
                    message: 'summary not found',
                    stack: err.stack,
                })
            );
        })
}


/*
https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Lucerne
*/