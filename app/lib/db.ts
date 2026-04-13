import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

// ପ୍ରଥମେ ଚେକ୍ କରନ୍ତୁ ଯେ .env ଫାଇଲ୍ ରେ MONGODB_URL ସେଟ୍ ହୋଇଛି କି ନାହିଁ
if (!mongodbUrl) {
    throw new Error("MONGODB_URL environment variable is not set");
}
/**
 * Next.js ରେ hot-reloading ଯୋଗୁଁ ପ୍ରତିଥର ସର୍ଭର ରିଷ୍ଟାର୍ଟ ହେଲେ ନୂଆ ନୂଆ MongoDB କନେକ୍ସନ୍ ତିଆରି ହୁଏ । 
 * ଏହାକୁ ରୋକିବା ପାଇଁ ଏବଂ ପୁରୁଣା କନେକ୍ସନ୍ କୁ ପୁନର୍ବାର ବ୍ୟବହାର କରିବା ପାଇଁ ଆମେ global variable 
 * ବ୍ୟବହାର କରି ଏହି କ୍ୟାସିଙ୍ଗ (caching) ସେଟଅପ୍ କରିଛୁ ।
 */
let cached = global.mongooseConn;

if (!cached) {
    cached = global.mongooseConn = {
        conn: null,
        promise: null,
    };
}

const connectDb = async () => {
    if (cached.conn) {
        console.log("Using cached MongoDB connection");
        return cached.conn;
    }
    if(cached.promise){
        console.log("Using existing MongoDB connection promise");
    }
    if (!cached.promise) {
        console.log("Creating new MongoDB connection");
        const opts = {
            bufferCommands: false, // କନେକ୍ସନ୍ ନଥିବା ବେଳେ କ୍ୟୁରି ବଫର୍ ହେବା ରୋକିବା ପାଇଁ
        };
        cached.promise = mongoose.connect(mongodbUrl, opts).then((m) => m.connection);
    }


    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null; // Error ହେଲେ ପ୍ରୋମିସ୍ କୁ କ୍ଲିୟର୍ କରନ୍ତୁ ଯେପରି ପୁଣି ଚେଷ୍ଟା କରିହେବ
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export { connectDb };