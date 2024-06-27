import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html')
})


app.listen(3000, () => {
    console.log('server running at http://localhost:3000')


})