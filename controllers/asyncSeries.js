const async = require("async");
const fs = require("fs");

const getFiles = (req, res) => {

    async.series([

        function (callback) {
            console.log("working file 1")
            fs.readFile("data/file1.txt", "utf-8", (err, data) => {

                console.log("File 1 Read");

                callback(err, data);
            });
        },

        function (callback) {
            console.log("working file 2")
            fs.readFile("data/file2.txt", "utf-8", (err, data1) => {

                console.log("File 2 Read");

                callback(err, data1);
            });
        },

        function(callback) {
            console.log("working file 3")
            fs.readFile("data/file3.txt", "utf-8", (err, data) => {

                console.log("File 3 Read");

                callback(err, data);
            });
        }

    ], function(err, results) {

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
    });
};

module.exports = {
    getFiles
};