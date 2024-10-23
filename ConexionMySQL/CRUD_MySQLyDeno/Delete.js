import { Client } from "https://deno.land/x/mysql/mod.ts";

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: "127.0.0.1",
        username: "root",
        db: "crud_deno",
        password: "1234",
        port: 3306,
    });

    let ID = prompt("Ingrese ID de usuario a borrar");

    try{

        const Result = await client.execute("DELETE FROM Usser WHERE ID = ?;", [ID]);

        console.log("Resultados de operación: \n", Result);

    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
        await client.close();
    }

}

connectionSQL();