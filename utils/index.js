require('dotenv').config();
const config = require('../config');
const fs = require('fs/promises');
const fsExtra = require('fs-extra');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuid } = require('uuid');
const debug = require('debug')('myapp:utils');
const path = require('path');
const { PRODUCT_IMAGE_UPLOAD_ERROR } = require('../lib/responses');

module.exports = {
    areImagesAllowed,
    uploadImage,
    emptyTempFolder
};

function areImagesAllowed(images) {
    for (let i = 0; i < images.length; i++) {
        const image = images[i];

        if (!config.ALLOWED_IMAGES_FORMAT.includes(image.mimetype)) {
            return false;
        }
    }

    return true;
}

async function uploadImage(file, name) {
    const imageName = `${name}-${uuid()}`;

    try {
        const fileContent = await fs.readFile(file.path);
        // delete the file from the uploads folder
        fs.unlink(file.path);

        const base64Content = fileContent.toString('base64');
        const data = new FormData();
        data.append('name', imageName);
        data.append('image', base64Content);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            headers: { ...data.getHeaders() },
            data,
        };

        const response = await axios.request(config);
        return {
            image_name: imageName,
            mimetype: file.mimetype,
            image_size: file.size,
            image_url: response.data.data.url,
            thumb_url: response.data.data.thumb.url,
            medium_url: response.data.data.medium.url,
            delete_url: response.data.data.delete_url,
        };
    } catch (error) {
        debug('Error uploading image:', error);
        throw new Error(PRODUCT_IMAGE_UPLOAD_ERROR);
    }
}

async function emptyTempFolder() {
    fsExtra.emptyDir(`${path.resolve(__dirname, '..')}/uploads/temp`)
        .then(() => debug('Temp Dir empty'))
        .catch((error) => debug({
            message: 'Error while cleaning Temp folder',
            error,
        }));
}