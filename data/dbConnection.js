import mongoose from 'mongoose';
import { StringDecoder } from 'string_decoder';
import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dudes", {
    useNewUrlParser: true
});

const dudesSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    language: {
        type: String
    },
    bikes: {
        type: Array
    },
    dudes: {
        type: Array
    }
});

const Dudes = mongoose.model("dudes", dudesSchema);

// SQL
const sequelize = new Sequelize('database', null, null, {
    dialect: "sqlite",
    storage: "./aliens.sqlite"
});

const Aliens = sequelize.define("aliens", {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    planet: { type: Sequelize.STRING }
});

Aliens.sync({ force: true }).then(() => {
    _.times(10, (i) => {
        Aliens.create({
            firstName: "fart",
            lastName: "taco",
            planet: casual.word
        });
    });
});

export { Dudes, Aliens };