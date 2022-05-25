
const fs = require('fs');
const dir = './file';
const moment = require('moment');
const getSortedFiles = async (dir) => {
    const files = await fs.promises.readdir(dir);

    return files
        .map(fileName => ({
            name: fileName,
            uploadDate: fs.statSync(`${dir}/${fileName}`).birthtime,
        }))
        .sort((a, b) =>  moment(b.uploadDate, "HH:mm") - moment(a.uploadDate, "HH:mm"))
        .map(elem => (
            {
                name: elem.name,
                uploadTime : elem.uploadDate
            }
        ));
};

Promise.resolve()
    .then(() => getSortedFiles(dir))
    .then(console.log)
    .catch(console.error);