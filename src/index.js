const  Pool  = require('pg').Pool;


const getConnection = () => {
    return {
        user: "user",
        host: "localhost",
        database: "db",
        password: "pass",
        port: 5432,
    }
  }

getConnection();

const createTable = async  (tableName) =>{
    const pool = new Pool(getConnection())
    const client =  await pool.connect();
    const res = await pool.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, visitor_name varchar(100), visitor_age int, date_of_visit text,time_of_visit time,assistant varchar(100),comments text);`);
    client.release()
    console.log(`${tableName} table created`);
    return res.rowCount;
  }
  const dropTable = async  (tableName) =>{
    const pool = new Pool(getConnection())
    const client =  await pool.connect();
    await pool.query(`DROP TABLE IF EXISTS ${tableName};`)
    client.release();
  }
  const addNewVisitor = async  (full_name,age,date_of_visit,time_of_visit,assistant,comments) =>{
    const pool = new Pool(getConnection());
    const client =  await pool.connect()
    tableName = `visitors`;
    const query_str = `INSERT INTO ${tableName} (visitor_name, visitor_age, date_of_visit , time_of_visit, assistant, comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    query_var = [full_name, age, date_of_visit, time_of_visit, assistant, comments];
    const res = await pool.query(query_str, query_var);
    console.log('Visitor has been added to database.');
    client.release();
    return res.rows;
  }
 const viewAllVisitors = async  () =>{
    const pool = new Pool(getConnection());
    const client =  await pool.connect()
    const query_str = 'Select id,visitor_name from visitors';
    const res = await pool.query(query_str);
    console.log(res.rows);
    client.release();
    return res.rows;
 }
const updateVisitor = async  (id,updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments ) =>{
    const pool = new Pool(getConnection());
    const client =  await pool.connect()
    const query_str = 'UPDATE visitors set  visitor_name = $2 , visitor_age = $3, date_of_visit =$4, time_of_visit =$5, assistant =$6 ,comments = $7  WHERE id =$1 RETURNING *';
    const query_var = [id,updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments];
    const res = await pool.query(query_str,query_var);
    console.log(`Visitor :${updateName} has been updated.`);
    client.release();
    client.end();
    return res.rows;
}
const deleteVisitor = async  (name) =>{
    const pool = new Pool(getConnection());
    const client =  await pool.connect()
    const query_str = 'DELETE from visitors WHERE visitor_name = $1';
    const query_var = [name];
    const res = await pool.query(query_str,query_var);
    console.log(`Visitor :${name} has been deleted.`);
    client.release();
    return res.rows;
}
const viewVisitor = async  (id) =>{
    const pool = new Pool(getConnection());
    const client =  await pool.connect()
    const query_str = 'Select * from visitors where id=$1';
    const query_var = [id];
    const res = await pool.query(query_str,query_var);
    console.log(res.rows);
    client.release();
    return res.rows;
}
const deleteAllVisitors = async  () =>{
    const pool = new Pool(getConnection())
    const client =  await pool.connect()
    const query_str = 'DELETE from visitors';
    const res = await pool.query(query_str);
    console.log('All data has been deleted.');
    client.release();
    return res;
}
  //createTable('visitors');
  //dropTable('visitors');
  //viewAllVisitors();
  //addNewVisitor('Thulani Khoza',21,'2020-02-10','11:30','Melusi','No comments');
  //updateVisitor(3,'Letsi Hadebe',30,'2020-02-10','10:30','Melusi','No comments')
    // .then(data => console.log(data))
    // .catch(err => console.log(err))
  //deleteVisitor('Philasane Mkhabela');
  //viewVisitor(1);
  //deleteAllVisitors();

  module.exports = {
    createTable,
    dropTable,
    addNewVisitor,
    viewAllVisitors,
    updateVisitor,
    deleteVisitor,
    viewVisitor,
    deleteAllVisitors
  }