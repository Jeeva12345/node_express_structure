const async = require("async");
const fs = require("fs");
const getParallelFiles = (req, res) => {
  async.parallel(
    [
      function (callback) {
        console.log("file1 working")
        fs.readFile("data/file1.txt", "utf-8", (err, data) => {
          console.log("File 1 done");
          callback(err, data);
        });
      },

      function (callback) {
        console.log("file2 working")
        fs.readFile("data/file2.txt", "utf-8", (err, data) => {
          console.log("File 2 done");
          callback(err, data);
        });
      },

      function (callback) {
        console.log("file3 working")
        fs.readFile("data/file3.txt", "utf-8", (err, data) => {
          console.log("File 3 done");
          callback(err, data);
        });
      },
    ],
    function (err, results) {
      if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            files: results
        });
    },
  );
};

module.exports = {
  getParallelFiles,
};
