const async = require("async");
const fs = require("fs");
const getWaterFallFiles = (req, res) => {
  async.waterfall(
    [
      function (callback) {
        fs.readFile("data/input.txt", "utf-8", (err, data) => {
          console.log("Read:", data);
          const data1 = "newString";
          callback(err, data, data1);
        });
      },

      function (data, newData1, callback) {
        console.log("newData1", newData1);

        const newData = data.toUpperCase();

        fs.writeFile("data/output.txt", newData, (err) => {
          console.log("Written to output");

          callback(err, newData);
        });
      },

      function (newData, callback) {
        fs.appendFile("data/output.txt", "\nDONE", (err) => {
          console.log("Appended");

          callback(err, "Completed");
        });
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        files: result,
      });
    },
  );
};

module.exports = {
  getWaterFallFiles,
};
