import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

//import data
const importData = async () => {
    try {
        await Order.deleteMany();//delete multiple recurrence of order
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };//object containing product data + user
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse); //using colors 
        process.exit();
    } catch (error) {
        console.error(`${error}.red.inverse`);
        process.exit(1);
    }
}

//destroy data
const destroyData = async () => {
    try {
        await Order.deleteMany();//delete multiple recurrence of order
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse); //using colors 
        process.exit();
    } catch (error) {
        console.error(`${error}.red.inverse`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') { //check for command line argument
    destroyData();
} else {
    importData();
}