import { MongoClient,ObjectId } from "mongodb";

const [username , password , dbname , collectionName ] = [encodeURIComponent("rajpootsahil51_db_user"),encodeURIComponent("Sahil@123"),"students","users"]
const client = new MongoClient(
  `mongodb+srv://${username}:${password}@cluster0.wftt93m.mongodb.net/?appName=Cluster0`
);

client.connect().then(async()=>{
    console.log("DB Connected from mongodb module");
    const db = client.db(dbname)
    const collection = db.collection(collectionName)
    const data = await collection.find().toArray()
    console.log(process[0]);
    
    const [name , age , employee_id  ] = [process.argv[2],process.argv[3],process.argv[4]]
    const userData = {
        name : name,
        age : age,
        employee_id : employee_id ,
        created_at : new Date().toLocaleString(),
        updated_at : new Date().toLocaleString()
    }
    await collection.insertOne(userData)
    console.log(userData);
    
    
})
//<---------------------Connnect with mongodb compass----------------------------->
// import { MongoClient , ObjectId} from "mongodb";

// const client = new MongoClient("mongodb://localhost:27017");

// client.connect().then(async()=>{
//     console.log("DB Connected");
//     const db = client.db("students")
//     const collection = await db.collection("users").find().toArray()
//     console.log(collection);
// })
    