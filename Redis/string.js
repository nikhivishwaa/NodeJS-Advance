import client from "./client.js";

const init = async ()=>{
    await client.set("msg:6", "This is from node js")
    let val = await client.get("msg:6")
    console.log("result: ",val)
}
init();