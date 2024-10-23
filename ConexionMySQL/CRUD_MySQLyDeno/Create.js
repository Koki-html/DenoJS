import { Client } from "https://deno.land/x/mysql/mod.ts";

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: "127.0.0.1",
        username: "Coqui",
        db: "crud_deno",
        password: "miguelmarzo",
        port: 3306,
    });

    var User = prompt("Ingrese Nombre")
    var Age = prompt("Ingrese edad")

    try{
        await client.execute("Insert into Usser(NameUsser, Age) values (?,?)", [User, Age]);

        const Result = await client.query("select * from Usser where NameUsser = ?", [User])
        console.log("Resultados de operación: \n", Result);
    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
       await client.close();
    }

}

connectionSQL();