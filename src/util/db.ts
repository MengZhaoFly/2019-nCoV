import mongoose from 'mongoose';

const mongodbUrl: string = 'mongodb://127.0.0.1:27017/2019-nCoV'

const connection = mongoose.createConnection(mongodbUrl);


export default connection;