const figlet = require("figlet");
const gradient = require("gradient-string");

const showTitle = (text, callback) => {
  figlet(text, { font: "Bloody" }, (err, data) => {
    if (err) {
      console.log("Bir hata oluştu...");
      console.dir(err);
      return;
    }

    const coloredText = gradient(["#00c6ff", "#0072ff", "#00ffb3"])(data);

    console.log(coloredText);
    if (callback) callback();
  });
};

module.exports = { showTitle };