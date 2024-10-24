import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

const ConfigData = await Deno.readTextFile("config.json");

const config = JSON.parse(ConfigData);

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: config.hostname,
        username: config.username,
        db: config.db,
        password: config.password,
        port: config.port,
    });

    const User = prompt("Ingrese Nombre")
    const Age = prompt("Ingrese edad")

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