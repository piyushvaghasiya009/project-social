import app from "./app";
import config from './src/config';
import connectDB from './src/helpers/db';


async function startServer() {
    // Establish a database connection for node's process
    await connectDB();

    app.listen(config.port, () => {
        console.log('Server Start on port ', config.port);
    });

}
startServer();