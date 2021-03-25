// this file returns a configured params object
// uuid package generates a unique 36-char alphanumeric string. this string is used for the image file names
const { v4: uuidv4 } = require("uuid");
// configure params
const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const imageParams = {
    Bucket: "user-images-9fed69e6-6de8-4619-90ab-0440f7f7bda9",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: "public-read", // allows read access
  };
  return imageParams;
};

module.exports = params;