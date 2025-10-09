import pg from "pg";
const {Pool}=pg
const pool= new Pool({
    user:"postgres",
    database:"my_db",
    port:5432,
    host:"localhost",
    password:"1234"
})


pool.connect()
.then(()=>console.log("Database ulandingiz"))
.catch(()=>console.log("Databasega ulanish bilan muammo"))

export default pool