import { Client } from "https://deno.land/x/mysql/mod.ts";
import { readJson } from "https://deno.land/std/fs/mod.ts";

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: config.hostname,
        username: config.username,
        db: config.db,
        password: config.password,
        port: config.port,
    });

    let User = prompt("Ingrese Nombre")
    let Age = prompt("Ingrese edad")

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