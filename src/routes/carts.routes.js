import { Router } from "express";
import { cartManager, Cart } from "../manager/CartManager.js";
//import { validateCartt } from "../utils/validateCart.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cartsJsonPath = path.resolve(__dirname, '../../data/carrito.json');

const router = Router();

console.log(cartsJsonPath);

const manager = new cartManager(cartsJsonPath);

router.get('/:cid', async (req, res) =>{
try{
    let cid = parseInt(req.params.cid);
    const productosEnCarritoBuscado = await manager.getProductsInCartById(cid);
        if (!productosEnCarritoBuscado){
            return res.json({
                error:"El Carrito No Existe"
            });
        }
        res.json({
            productosEnCarritoBuscado
        });
}catch(error){
    console.log(error);
        res.json({
            error: error
        });
    }
});

router.post('/', async (req, res) => {
    
    //const cartDetails= req.body;
    // for (const { id, quantity } of cartDetails) {
    //     console.log("ID:", id);
    //     console.log("Quantity:", quantity);
    // };
    const  cartDetails = [];
    const nuevoCarrito = new Cart(cartDetails);
    console.log(nuevoCarrito);
    try {
        const IsCartAdded = await manager.addCart(nuevoCarrito);
        if (IsCartAdded){
            res.json({
                message: "Carrito creado",
                nuevoCarrito,
            });
        }
        else{
            res.json({
                error: "Failded to add cart"
            });
        }
        
    }
    catch(e){
        res.json({
            error:e.messages,
        });
    };
    
});    
router.post('/:cid/product/:pid', async(req, res) =>{
    const {cid, pid } = req.params;

    const {product, quantity} = req.body;
    // REcuperar los productos del  carrito
    try{
        const isItemUpdate = await manager.addItemToCart(cid, pid, quantity);
        console.log(isItemUpdate);
        res.json("Fin Proc");
    }
    catch(e){
        res.json({
            error:e.messages
        });
    };
    
    

});

    export default router;  