require("dotenv").config()
const express = require("express")
const cors = require("cors")


const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

const db = require("./app/models")
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log('Database connected!');
}).catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit()
})

app.get("/", (req, res) => {
    res.send('Selamat datang di server ini.')
})

require("./app/routes/post.routes")(app)
const PORT = 8000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})