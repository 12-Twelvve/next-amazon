import  mongoose  from "mongoose";

const MONGOURI = "mongodb+srv://oneaboveall:awesome12@cluster0.dlvfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const MONGOURI = process.env.MONGOURI  // does not work  ??? why idk

// console.log(MONGOURI)
if (!MONGOURI) {
  throw new Error(
    'Please define the "MONGODB_URI" environment variable inside .env'
  )
}
const connection = {};

async function connect(){
    if (connection.isConnected){
        console.log('already connected');
        return;
    }
    if(mongoose.connections.length> 0){
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected===1){
            console.log('use previous connection');
            return;
        }
        await mongoose.disconnect();
    }
    console.log("-----------------------")
    const db = await mongoose.connect(MONGOURI);
    console.log("new connection");
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect(){
    if(connection.isConnected){
        if(process.env.NODE_ENV==='production'){
            await mongoose.disconnect();
            connection.isConnected =false;
        }
        else{
            console.log('not disconnected');
        }
    }
}
function convertDocToObj(doc){
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}

const db = {connect , disconnect, convertDocToObj};
export default db;