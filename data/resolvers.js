import mongoose from 'mongoose';
import { Dudes, Aliens } from './dbConnection';

// Resolver map
export const resolvers = {
    Query: {
        getDudes: () => {
            return Dudes.find();
        },
        getOneDude: (root, { id }) => {
            return new Promise((resolve, object) => {
                Dudes.findById(id, (err, dude) => {
                    if (err) reject(err);
                    else resolve(dude);
                })
            })
        },
        getAliens: () => {
            return Aliens.findAll();
        }
    },
    Mutation: {
        createDude: (root, { input }) => {
            const newDude = new Dudes({
                firstName: input.firstName,
                lastName: input.lastName,
                age: input.age,
                language: input.language,
                bikes: input.bikes,
                dudes: input.dudes
            })

            newDude.id = newDude._id;

            return new Promise((resolve, object) => {
                newDude.save((err) => {
                    if (err) reject(err);
                    else resolve(newDude); 
                })
            });
        },
        updateDude: (root, { input }) => {
            return new Promise((resolve, object) => {
                Dudes.findOneAndUpdate({_id: input.id}, input, {new: true}, (err, dude) => {
                    if (err) reject(err);
                    else resolve(dude);
                })
            })
        },
        deleteDude: (root, { id }) => {
            return new Promise((resolve, object) => {
                Dudes.remove({_id: id}, (err) => {
                    if (err) reject(err);
                    else resolve(`Deleted Dude with id: ${id}`);
                })
            })
        }
    },
};