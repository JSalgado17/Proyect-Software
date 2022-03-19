const express = require('express');
const router = express.Router();

const Clientes= require('../../../../dao/clientes/clientes.model');
const clienteModel = new Clientes();

router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Clientes',
      updates: new Date(2022, 0, 19, 18, 41, 0)
    }
  );
}); //GET /

router.get('/all', async (req, res) => {
  try {
    const rows = await clienteModel.getAll();
    res.status(200).json({ status: 'ok', clientes: rows });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});
// /byid/1;
router.get('/byid/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const row = await clienteModel.getById(id);
    res.status(200).json({ status: 'ok', cliente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

const allowedItemsNumber = [10, 15, 20];
//facet search
router.get('/facet/:page/:items', async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const clientes = await clienteModel.getFaceted(page, items);
      res.status(200).json({ docs: clientes });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10,15,20)' });
  }

});

router.get('/byname/:name/:page/:items', async (req, res) => {
  const name = req.params.name;
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const clientes = await clienteModel.getFaceted(page, items, { nombres: name });
      res.status(200).json({ docs: clientes });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10,15,20)' });
  }

});

router.get('/byagegender/:age/:gender', async (req, res) => {
  try {
    const { age, gender } = req.params;
    const row = {}; // await pacienteModel.getById(parseInt(id));
    res.status(200).json({ status: 'ok', cliente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

router.post('/new', async (req, res) => {
  const { identidad, nombres, apellidos, pais, email, telefono } = req.body;
  try {
    rslt = await clienteModel.new(identidad, nombres, apellidos, pais, email, telefono);
    res.status(200).json(
      {
        status: 'ok',
        result: rslt
      });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(
      {
        status: 'failed',
        result: {}
      });
  }
}); //POST /new


//router.put();
router.put('/update/:id', async (req, res) => {
  try {
    const { identidad, nombres, apellidos, pais, email, telefono } = req.body;
    const { id } = req.params;
    const result = await clienteModel.updateOne(id, identidad, nombres, apellidos, pais, email, telefono);
    res.status(200).json({
      status: 'ok',
      result
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

//router.delete();
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clienteModel.deleteOne(id);
    res.status(200).json({
      status: 'ok',
      result
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});


module.exports = router;