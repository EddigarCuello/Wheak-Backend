const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

router.post('/', async (req, res) => {
  const { action, collection, data } = req.body;

  try {
    switch (action) {
      case 'get':
        const documents = await crudController.getAllDocuments(collection);
        res.json(documents);
        break;
      case 'getById':
        const documentById = await crudController.getDocumentById(collection, data);
        res.json(documentById);
        break;
      case 'create':
        const newDocument = await crudController.createDocument(collection, data);
        res.json({ message: `Documento creado exitosamente en la colección ${collection}`, document: newDocument });
        break;
      case 'update':
        await crudController.updateDocumentById(collection, data.id, data.updateData);
        res.json({ message: `Documento actualizado exitosamente en la colección ${collection}` });
        break;
      case 'delete':
        await crudController.deleteDocumentById(collection, data);
        res.json({ message: `Documento eliminado exitosamente de la colección ${collection}` });
        break;
      default:
        res.status(400).json({ error: 'Acción no válida' });
    }
  } catch (error) {
    console.error(`Error en la operación ${action} de la colección ${collection}:`, error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
