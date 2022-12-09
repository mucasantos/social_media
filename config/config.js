import  data  from "../project_data_secret.js"



const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || data.jwtSecret,
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || data.DBLINK
}

export default config