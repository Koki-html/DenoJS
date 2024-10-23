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

        var OP = prompt("Seleccione que desea modificar: \n 1- Nombre de usuario \n 2- Edad del usuario \n Ingrese opción: ")

        switch (OP) {
            case "1":

                var ID = prompt("Ingrese ID de persona a modificar");
                
                const Result1 = await client.query("Select * from Usser where ID = ?", [ID]);
                
                console.log("\n Persona a modificar: \n ", Result1);

                var Name = prompt("\n Ingrese nuevo nombre");

                await client.execute("UPDATE Usser SET NameUsser = ? WHERE ID = ? ;", [Name, ID]);

                const Result2 = await client.query("select * from Usser where ID = ?;", [ID]);

                console.log("\n Resultados de la modificación: \n", Result2);

                break;
        
            default:
                console.log("Opción incorrecta.")
                break;
        }

    } catch (error){
        console.error("error al realizar las operaciones", error);
    } finally {
        await client.close();
    }

}

connectionSQL();