import { Client } from "https://deno.land/x/mysql/mod.ts";

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: "127.0.0.1",
        username: "root",
        db: "crud_deno",
        password: "1234",
        port: 3306,
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