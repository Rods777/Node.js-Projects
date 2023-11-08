const express = require("express");
const hbs = require("hbs"); // handlebars
const path = require("path");
const app = express();
const weatherData = require("../utils/weatherData"); // weather API

const port = process.env.PORT || 3000;

// Path Directories
const publicStaticDirPath = path.join(__dirname, '../public');

const viewPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicStaticDirPath));

// Route to the Server (app.get)

app.get('', (req, res) => { //Default route: localhost:3000
    res.render( 'index', { // render.() -> fetching the data from index.hbs
        title: 'Weather App'
    }
    );
})


app.get('/weather', (req, res) => { // localhost:3000/weather?address=manila
    const address = req.query.address; //weather?address=

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({ // Displays the data from API on website
            temperature,
            description,
            cityName
        })
    })
})

app.get('*', (req, res) => { // route for unknown path localhost:3000/(random)
    res.render('404', {
        title: "Page Not Found! Ginagawa mo bok?"
    });
})


app.listen(port, ()=> {
    console.log("Server is up and running on port: ", port);
})