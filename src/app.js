import express from "express";
import productRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { logger } from "./utils/logger.js";

const PORT=8080;        // Puerto de escucha
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.listen(8080,()=>{
    console.log(`Servidor online in port ${PORT}`);
});

app.get('/', (req,res) =>{
    res.json({
        status:"OK",
        message:"Bienvenido el Servidor esta disponible"
    });
})

app.use(logger);
//console.log("Definicion de Ruta a productos");
app.use("/api/products", productRouter);
//console.log("Definicion de rutas a Carts");
app.use("/api/carts",cartsRouter);



