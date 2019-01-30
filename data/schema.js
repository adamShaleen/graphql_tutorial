import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs =`

    type Dude {
        id: ID
        firstName: String
        lastName: String
        age: Int
        language: Language
        bikes: [Bike]
        dudes: [Dude]
    }

    type Bike {
        id: ID
        makeAndModel: String!
        bikeType: BikeType
    }

    enum BikeType {
        BMX,
        MTB,
        COMMUTE,
        ALLROAD
    }

    type Alien {
        id: ID
        firstName: String
        lastName: String
        planet: String
    }

    enum Language {
        ENGLISH,
        SPANISH,
        GERMAN
    }

    type Query {
        getDudes: [Dude]
        getOneDude(id: ID!): Dude
        getAliens: [Alien]
    }

    input DudeInput {
        id: ID
        firstName: String
        lastName: String
        age: Int
        language: Language
        bikes: [BikeInput]
        dudes: [DudeInput]
    }

    input BikeInput {
        id: ID
        makeAndModel: String
        bikeType: BikeType
    }

    type Mutation {
        createDude(input: DudeInput): Dude
        updateDude(input: DudeInput): Dude
        deleteDude(id: ID!): String
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };