const oracledb = require('oracledb');
try {
  oracledb.initOracleClient({libDir: 'D:\\DBMS\\instantclient_21_3'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

const mypw = "kjadDPOLINHUADFhfdkgas1978516345DGHS464fsDSA65464119890601HldaSDARFsdfdhDSFhgdjsfh".substring(50, 60);

var a = "xyz";

async function establishConnection() {
  try {
    connection = await oracledb.getConnection({
      username      : "franklyn",
      password      : mypw,
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    });

    //console.log(connection);
    result = await connection.execute(`SELECT NAME FROM AIRPORT`);
    console.log("Result is:", result);

  } catch (err) {
    console.error(err.message);
  } finally {
    return connection;
    /*
    if (connection) {
      try {
        await connection.close();   // Always close connections
      } catch (err) {
        console.error(err.message);
      }
    }
    */
  }
}

connection = establishConnection();

module.exports = {connection, a}