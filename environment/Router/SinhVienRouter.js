const express = require("express")
const router = express.Router()

const SinhVienController=require('../Controller/SinhVienController');

router.get('/',SinhVienController.GetAllList);

router.post('/',SinhVienController.createNewRecord);

router.get('/:id',SinhVienController.GetOneRecord);

router.put('/:id',SinhVienController.updateRecord);

router.delete('/:id',SinhVienController.deleteRecord)

module.exports = router;