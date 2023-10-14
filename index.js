const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 3000;
const filename = __dirname + "/scannedbarcodes.json";

// Middleware
app.use(express.json()); 
app.use(cors()); 

function log(req, res, next) {
    console.log(`${req.method} Request at ${req.url}`);
    next();
}
app.use(log);

// Endpoints
/*app.get("/barcodes", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        res.json(JSON.parse(data));
    });
});*/
app.get('/',function (req, res){
return res.send("Hellow World!");
});

app.get("/barcodes/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        const barcode = JSON.parse(data)[req.params.id];
        res.json(barcode);
    });
});

app.put("/barcodes/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let barcodes = JSON.parse(data);
        barcodes[req.params.id] = req.body; // direct replacement of the barcode data
        fs.writeFile(filename, JSON.stringify(barcodes), () => {
            res.json(barcodes);
        });
    });
});

app.delete("/barcodes/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let barcodes = JSON.parse(data);
        barcodes.splice(req.params.id, 1);
        fs.writeFile(filename, JSON.stringify(barcodes), () => {
            res.json(barcodes);
        });
    });
});

app.post("/barcodes", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let barcodes = JSON.parse(data);
        let newBarcode = req.body.barcode; // assuming the barcode is sent as { "barcode": "1234567890" }

        if (!barcodes.includes(newBarcode)) { // check to ensure the barcode is unique
            barcodes.push(newBarcode);
        }

        fs.writeFile(filename, JSON.stringify(barcodes), () => {
            res.json(barcodes);
        });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
