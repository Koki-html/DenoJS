import { Client } from "https://deno.land/x/mysql/mod.ts";

async function connectionSQL() {
    const client = await new Client().connect({
        hostname: "127.0.0.1",
        username: "Coqui",
        db: "crud_deno",
        password: "miguelmarzo",
        port: 3306,
    });

    let InputUser = document.getElementById('NameUser');
    let InputAge = document.getElementById('AgeUser')
    let BttnSubmit = document.getElementById('BttnSbtm');
    
    BttnSubmit.addEventListener('Click', Ccrud());
    function CCrud(){
        try{
            client.execute("Insert into Usser(NameUsser, Age) values (?,?)", [InputUser, InputAge]);
        } catch (error){
            console.error("error al realizar las operaciones", error);
        } finally {
            client.close();
        }
    }

}

connectionSQL();