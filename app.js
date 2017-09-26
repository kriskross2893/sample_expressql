const express = require('express')
const graphqlHTTP = require('express-graphql');
var cors = require('cors');
var { buildSchema } = require('graphql');

const app = express()


var schema = buildSchema(`
	type Property {
		id: String
		street: String
		city: String
		state: String
		zip: String
		rent: Int
	}

    type Query {
        getProperties(search: String, criteria: String!): [Property]
    }
`);
const properties = [
	{"id":"5592d311d7c6770300911b65","street":"505 South Market St","city":"San Jose","state":"CA","zip":"95008","rent":3500},
	{"id":"456161314f21gfd45gs14543","street":"404 North Market St","city":"San Maria","state":"DA","zip":"45789","rent":8200},
	{"id":"32f1a5f4q51r22332123fda2","street":"303 East Market St","city":"San Dosena","state":"EA","zip":"12451","rent":1100},
	{"id":"345451fd2ag4f551423d4uy3","street":"202 West Market St","city":"San Delabra","state":"FA","zip":"00128","rent":6000},
]
// The root provides a resolver function for each API endpoint
var root = {
    getProperties: (args) => {
    	if(args.search.length>0){
	    	let matchingProperties = []

	    	for(let i = 0; i < properties.length; i++){
	    		if(properties[i][args.criteria].includes(args.search)){
	    			matchingProperties.push(properties[i]);
	    		}
	    	}
	    	return matchingProperties;
    	} else {
    		return [];
    	}
    },
};

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
}));

app.listen(4000, function () {
    console.log('Example express graphql listening on port 4000!')
})