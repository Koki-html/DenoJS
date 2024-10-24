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

        const OP = prompt("Seleccione que desea modificar: \n 1- Nombre de usuario \n 2- Edad del usuario \n Ingrese opción: ")

        const ID = prompt("Ingrese ID de persona a modificar");

        const Result1 = await client.query("Select * from Usser where ID = ?", [ID]);

        console.log("\n Persona a modificar: \n ", Result1);

        switch (OP) {
            // deno-lint-ignore no-case-declarations
            case "1":

                const Name = prompt("\n Ingrese nuevo nombre");

                await client.execute("UPDATE Usser SET NameUsser = ? WHERE ID = ? ;", [Name, ID]);

                break;
            
            // deno-lint-ignore no-case-declarations
            case "2":

                const Age = prompt("\n Ingrese nueva edad");

                await client.execute("UPDATE Usser SET Age = ? WHERE ID = ? ;", [Age, ID]);

                break;
            default:
                console.log("Opción incorrecta.")
                break;
        }

        const Result = await client.query("select * from Usser where ID = ?;", [ID]);

        console.log("\n Resultados de la modificación: \n", Result);

    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
        await client.close();
    }

}

connectionSQL();