const mongoose = require('mongoose');
const cities = require ('./cities');
const {places, descriptors} = require ('./seedHelpers');
const Campground = require ('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '608eefadc4c4000dec6df08b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/yatnesh14/image/upload/v1620399313/YelpCamp/DUNWFNGOAVCRLAHO4ZPTBKNJEM_r3h5ij.jpg',
                filename: 'YelpCamp/DUNWFNGOAVCRLAHO4ZPTBKNJEM_r3h5ij'
            }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus mollitia similique nihil eum quisquam hic aspernatur labore. Expedita perspiciatis, sed aperiam odio saepe quod modi? Ad dolores repudiandae a atque.',
            price
        })

        await camp.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close();
});