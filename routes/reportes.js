const express =require('express');
const Comanda = require("../models/Comanda");
const Venta = require("../models/Venta");
const Reserva = require("../models/Reserva");
const router = express.Router();

router.get('/obtenerTodasLasEstadisticas', async (req,res) => {
    const startDate = new Date(req.query.start);
    const endDate = new Date(req.query.end);
    try {
        const promises = [];
        promises.push(ventasPorMetodoDePago(startDate, endDate));
        promises.push(ventasPorProducto(startDate, endDate, true));
        promises.push(ventasPorProducto(startDate, endDate, false));
        promises.push(mesasAtendidasPorMesero(startDate, endDate));
        promises.push(totalDeVentasDelPeriodo(startDate, endDate));
        promises.push(envioDeComandasPorHora(startDate, endDate));
        promises.push(tiempoPromedioPorComanda(startDate, endDate));

        const results = await Promise.all(promises);

        let response = {};
        response.ventasPorMetodoDePago = results.shift();
        response.ventasPorProductoDePlatos = results.shift();
        response.ventasPorProductoDeOtros = results.shift();
        response.mesasAtendidasPorMesero = results.shift();
        response.totalDeVentasDelPeriodo = results.shift();
        response.envioDeComandasPorHora = results.shift();
        response.tiempoPromedioPorComanda = results.shift();

        //if (report3) response.report3 = results.shift();

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

async function ventasPorMetodoDePago(startDate, endDate) {
    return await Venta.aggregate([
        {$match: {date: {$gte: startDate, $lte: endDate}}},
        {
            $group: {
                _id: {paymentMethod: '$paymentMethod'},
                totalSales: {$sum: '$total'}
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]).exec();
}

async function tiempoPromedioPorComanda(startDate, endDate){
    const result = await Comanda.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $project: {
                timeDiff: { $subtract: ["$updatedAt", "$createdAt"] }
            }
        },
        {
            $group: {
                _id: null,
                averageTimeDiff: { $avg: "$timeDiff" }
            }
        }
    ]).exec();

    const averageTimeInMs = result[0]?.averageTimeDiff || 0;
    return averageTimeInMs / 1000;
}

async function totalDeVentasDelPeriodo(startDate, endDate){
    return  await Venta.aggregate([
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        { $group: {
                _id: null,
                cantidadVentasTotales: { $count: {}},
                montoVentasTotales: { $sum: '$total'}
            }},
        {$sort: {
                _id: 1
        }}
    ]).exec();
}

async function ventasPorProducto(startDate, endDate, isPlate){
    return  await Venta.aggregate([
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        { $unwind: '$products' },
        { $match: { 'products.isPlate': isPlate } },
        { $group: {
                _id: {product_name: '$products.product_name'},
                totalQuantity: { $sum: '$products.quantity'},
                totalSales: { $sum: '$products.total'}
            }},
        {$sort: {
                _id: 1
        }}
    ]).exec();
}

async function mesasAtendidasPorMesero(startDate, endDate){
    return await Reserva.aggregate([
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        { $group: {
                _id: "$waiterName",
                cantidadPedidos: { $count: {} }
            }},
        {$sort: {
                _id: 1
        }}
    ]).exec();
}

async function envioDeComandasPorHora(startDate, endDate){
    return await Comanda.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $project: {
                hour: { $hour: "$createdAt" }
            }
        },
        {
            $group: {
                _id: "$hour",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]).exec();

}

async function ventasCerradasPorHora(startDate, endDate){
    //retornar en cantidad
}

async function pedidosDevueltos(startDate, endDate){
    //retornar en cantidad
}

module.exports = router;