const app = require('express')();
const fs = require('fs');
const dataFilePath = './dataset.csv';
const csv = require('csvtojson');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req, res) => {
    csv()
        .fromFile(dataFilePath)
        .then(jsonObj => {
            const result = {}
            result.data = jsonObj;
            res.send(result);
        });
})

app.get('/:id', (req, res, next) => {
    csv()
        .fromFile(dataFilePath)
        .then(jsonObj => {
            const result = {};
            result.data = jsonObj;

            for (let i = 0; i < result.data.length; i++) {
                if (result.data[i].ID == +req.params.id) {
                    result.data = result.data[i];
                    res.send(result);
                    return;
                }
            }

            res.status(404).send({
                error: {
                    "message": "No record found!"
                }
            });
        });
})

app.use((err, req, res, next) => {
    res.json({ error: { "message": err.message }});
})

app.listen(3000);