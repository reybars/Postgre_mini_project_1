import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let visited_countries = [];

const client = new pg.Client({
  host: 'localhost', 
  port: 5432,
  database: 'world',
  user: 'postgres',
  password: 'admin123'
});
client.connect();

const res = await client.query("select country_code from visited_countries");
visited_countries = res.rows.map(code =>code.country_code);

console.log(visited_countries)

app.get("/", async (req, res) => {
  //Write your code here.
  res.render("index.ejs", {countries : visited_countries, total : visited_countries.length} )
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
