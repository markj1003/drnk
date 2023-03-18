const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://markj10031:onlyDrinks@drnk.ctgpt93.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  async function do_test() {
  await client.connect();
    console.log('hello');
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    const result = collection.find(
      { 
        username: 'monster'
      });
    if (result) {
        resarray = await result.toArray();
        console.log(resarray);
        console.log('monster')
    }
    else {
        console.log('ffs')
    };
    
    client.close();
  }

  async function put_kwang(listing) {
    await client.connect();
    const collection = client.db('test').collection('devices');
    const result = await collection.insertOne(listing);
    console.log(result);
    client.close();
  }

  //put_kwang({
  //  username: 'kwang',
  //  password: 'ming'});
  //console.log('here');
  do_test();