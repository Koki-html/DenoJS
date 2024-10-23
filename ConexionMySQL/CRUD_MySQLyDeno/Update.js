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

        let OP = prompt("Seleccione que desea modificar: \n 1- Nombre de usuario \n 2- Edad del usuario \n Ingrese opción: ")

        let ID = prompt("Ingrese ID de persona a modificar");

        const Result1 = await client.query("Select * from Usser where ID = ?", [ID]);

        console.log("\n Persona a modificar: \n ", Result1);

        switch (OP) {
            case "1":

                let Name = prompt("\n Ingrese nuevo nombre");

                await client.execute("UPDATE Usser SET NameUsser = ? WHERE ID = ? ;", [Name, ID]);

                break;
            
            case "2":

                let Age = prompt("\n Ingrese nueva edad");

                await client.execute("UPDATE Usser SET Age = ? WHERE ID = ? ;", [Age, ID]);

                break;
            default:
                console.log("Opción incorrecta.")
                break;
        }

        const Result = await client.query("select * from Usser where ID = ?;", [ID]);

        console.log("\n Resultados de la modificación: \n", Result1);

    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
        await client.close();
    }

}

connectionSQL();