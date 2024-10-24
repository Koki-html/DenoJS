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


    try{

        const Result = await client.query("Select * from Usser");

        console.log("Resultados de busqueda: \n", Result);

    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
        await client.close();
    }

}

connectionSQL();