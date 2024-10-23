import { Client } from "https://deno.land/x/mysql/mod.ts";

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: config.hostname,
        username: config.username,
        db: config.db,
        password: config.password,
        port: config.port,
    });


    let Edad = prompt("Ingrese edad a buscar");

    try{

        const Result = await client.query("Resultados: \n Select * from Usser where age = ?;", [Edad]);

        console.log("Resultados de busqueda: \n", Result);

    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
        await client.close();
    }

}

connectionSQL();