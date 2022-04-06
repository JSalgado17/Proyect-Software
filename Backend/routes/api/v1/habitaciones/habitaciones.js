const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

const Habitaciones = require('../../../../dao/habitaciones/habitaciones.model');
const HabitacionesModel = new Habitaciones();


router.get('/', (req, res)=>{
    res.status(200).json(
        {
            endpoint: 'Habitaciones',
            updates: new Date(2022,0,19,18,41,0)
        }
    );
});


//******GET ALL

router.get('/all', async (req, res) =>{
    try {
        console.log("User Request", req.user);
        const rows = await HabitacionesModel.getAll();
        res.status(200).json({status:'ok', habitaciones: rows});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//******FACET SEARCH
const allowedItemsNumber = [10, 15, 20];
//facet search
router.get('/facet/:page/:items', async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const habitaciones = await HabitacionesModel.getFaceted(page, items);
      res.status(200).json({docs:habitaciones});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
  }

});

//POR NOMBRE
router.get('/byname/:name/:page/:items', async (req, res) => {
    const name = req.params.name;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);
    if (allowedItemsNumber.includes(items)) {
      try {
        const habitaciones = await HabitacionesModel.getFaceted(page, items, {nombres: name});
        res.status(200).json({ docs: pacientes });
      } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
      }
    } else {
      return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10,15,20)' });
    }
  
  });

//*****GET DE BUSQUEDA(METODO BUSCAR)
//*****byid/1
//*****byid/1:{id}
router.get('/byid/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const row = await HabitacionesModel.getById(id);
        res.status(200).json({status:'ok', pacientes: row});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//**POST**
router.post('/new', async (req, res) =>{
    const {id, habitaciones, observacion, disponibles, ultimaReservacion} = req.body;
    try {
        rslt = await HabitacionesModel.new(id, habitaciones, observacion, disponibles, ultimaReservacion);
        res.status(200).json(
            {
                status: 'ok',
                result: rslt
            }
        );
    } catch (ex) {
        console.log(ex);
        res.status(500).json(
            {
                status: 'failed',
                result: {}
            }
        );
    }
});


//***ACTUALIZAR
router.put('/update/:id', async (req, res) =>{
    try {
        const { habitaciones, observacion, disponibles, ultimaReservacion } = req.body;
        const {id} = req.params;
        const result = await HabitacionesModel.updateOne(id, habitaciones, observacion, disponibles, ultimaReservacion);
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//__UPDATETAG_____________
router.put('/addtag/:id', async (req, res) =>{
    try {
        const {tag} = req.body;
        const {id} = req.params;
        const result = await HabitacionesModel.updateAddTag(id, tag );
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

router.put('/addtagset/:id', async (req, res) =>{
    try {
        const {tag} = req.body;
        const {id} = req.params;
        const result = await PacienteModel.updateAddTagSet(id, tag );
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

// router.put('/removetag/:id', async (req, res) =>{
//     try {
//         const {tag} = req.body;
//         const {id} = req.params;
//         const result = await PacienteModel.updatePopTag(id, tag );
//         res.status(200).json({
//             status:'ok',
//             result
//         });
//     } catch (ex) {
//         console.log(ex);
//         res.status(500).json({status:'failed'});
//     }
// });
//_______________

//***BORRAR
router.delete('/delete/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const result = await HabitacionesModel.deleteOne(id);
        res.status(200).json({
            status:'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});


// OBTENER
// router.post(); // ENVIAR
// router.put(); // MODIFICAR
// router.delete(); // BORRAR

module.exports = router;