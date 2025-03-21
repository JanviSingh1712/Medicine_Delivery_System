require("dotenv").config();

const mongoose = require("mongoose");

// const mongoURI = 'mongodb+srv://janvisingh1708:Janvi10151@cluster0.ngw0nwo.mongodb.net/Summer_Project?retryWrites=true&w=majority&appName=Cluster0';

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB");

    const MedTech = mongoose.connection.collection("Med_Tech");
    const medTechData = await MedTech.find({}).toArray();

    const MedCategory = mongoose.connection.collection("Med_Category");
    const medCategoryData = await MedCategory.find({}).toArray();

    // Store data in global variables
    global.Med_Tech = medTechData;
    global.Med_Category = medCategoryData;
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;

// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://janvisingh1708:Janvi10151@cluster0.ngw0nwo.mongodb.net/Summer_Project?retryWrites=true&w=majority&appName=Cluster0';

// const mongoDB = async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Connected successfully to MongoDB");

//         const MedTech = mongoose.connection.collection("Med_Tech");
//         const medTechData = await MedTech.find({}).toArray(async function(err,data){
//             const Med_Category = mongoose.connection.collection("Med_Category");
//             Med_Category.find({}).toArray(function(err,catData){
//                 if(err) console.log(err);
//                 else{
//                     global.Med_Tech=data;
//                     global.Med_Category=catData;
//                 }
//             })
//         })

//         console.log("Med_Tech Data:", medTechData);
//         global.Med_Tech = medTechData;  // Corrected here
//         // console.log(global.Med_Tech);

//     } catch (err) {
//         console.error("Error connecting to MongoDB or fetching Med_Tech data:", err);
//     }

// };

// module.exports = mongoDB;
