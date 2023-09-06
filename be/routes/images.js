const db = require('../db/knex');
const multer = require('multer');
const path = require('path');
// const {authenticateToken} = require('../modules/jwt_utils.js');

const imageUpload = multer({
    dest: 'images',
});

module.exports = app => {
    app.route('/images')
        .post(imageUpload.single('image'), (req, res) => {
            console.log(req.file);
            const { filename, mimetype, size } = req.file;
            const filepath = req.file.path;

            db
                .insert({
                    filename, filepath, mimetype, size
                })
                .into('image_files')
                .then(() => res.json({
                    success: true,
                    filename
                }))
                .catch(err => res.json({
                    success: false,
                    message: 'upload failed',
                    stack: err.stack,
                }));
        });
    
    app.route('/images/:filename')
        .get((req, res) => {
            const { filename } = req.params;
            
            db
                .select()
                .from('image_files')
                .where({filename})
                .first()
                .then(image => {
                    if (image) {
                        const dirname = path.resolve();
                        const fullFilePath = path.join(dirname, image.filepath);
                        return res.type(image.mimetype).sendFile(fullFilePath);
                    }
                    return Promise.reject(
                        new Error('Image does not exist')
                    );
                })
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'image not found',
                        stack: err.stack,
                    })
                );
            
        });
}