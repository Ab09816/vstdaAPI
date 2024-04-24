const server = require('./app');

// write your code here

const PORT = process.env.PORT || 8484; //the port to listen on

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
