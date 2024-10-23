//Import of MYSQL client
import { Client } from "https://deno.land/x/mysql/mod.ts";


//Function for connect to MYSQL

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: "127.0.0.1",
        username: "root",
        db: "conexion_deno",
        password: "1234",
        port: 3306,
    });

    try{
        const names = ["Byron", "Coqui", "Kiryu", "Hayu", "Chihiro", "Kode", "Hokd", "Near", "Ximena"];
        for (const name of names){
            await client.execute("Insert into Clientes(nombre) values (?)", [name]);

        }
        await client.execute("insert into Relaciones(ID1, ID2) values(2, 9), (4,6);");
        console.log("Multiples registros insertados de forma exitosa.");

        //Select to table "Clientes"
        const result = await client.query("SELECT * FROM Clientes");

        const result2 = await client.query("SELECT c1.Nombre as 'Nombre 1', c2.Nombre as 'Nombre 2' FROM Relaciones as r INNER JOIN Clientes as c1 on r.ID1 = c1.ID INNER JOIN Clientes as c2 on r.ID2 = c2.ID;");

        //Print query results

        console.log(result);
        console.log(result2);
    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally{
        //Close connection

        await client.close();
    }


}

connectionSQL();