const axios = require('axios');

const SERVER_URL = 'https://prep50-server.onrender.com'; // Replace this with your server URL

async function pingServer() {
  try {
    const response = await axios.get(SERVER_URL);
    console.log('Server pinged successfully');
  } catch (error) {
    console.error('Error pinging server:', error.message);
  }
}


module.exports = pingServer;


