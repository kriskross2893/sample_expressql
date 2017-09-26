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
        getProperties(search: String): [Property]
    }
`);
const properties = [
	{"id":"5592d311d7c6770300911b65","street":"505 South Market St","city":"San Jose","state":"CA","zip":"95008","rent":3500},
	{"id":"5592d311d7c6770300911b64","street":"404 South Market St","city":"San Maria","state":"CA","zip":"95008","rent":3200},
	{"id":"5592d311d7c6770300911b63","street":"303 South Market St","city":"San Dosena","state":"CA","zip":"95008","rent":3100},
	{"id":"5592d311d7c6770300911b62","street":"202 South Market St","city":"San Delabra","state":"CA","zip":"95008","rent":3000},
]
// The root provides a resolver function for each API endpoint
var root = {
    getProperties: (args) => {
    	if(args.search.length>0){
	    	let matchingProperties = []
	    	for(let i = 0; i < properties.length; i++){
	    		if(properties[i].id.includes(args.search) || properties[i].street.includes(args.search) || 
	    			properties[i].city.includes(args.search) || properties[i].state.includes(args.search) ||
	    			properties[i].zip.includes(args.search)){
	    			matchingProperties.push(properties[i])
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

app.listen(3000, function () {
    console.log('Example express graphql listening on port 3000!')
})