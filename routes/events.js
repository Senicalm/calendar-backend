/*
    Rutas de eventos
    host + /api/events
*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../constrollers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Com que tots els endpoint tenen que tindre el middleware de validacio de token. podem posar en una sola linea amb el router.use()
router.use(validarJWT);

router.get('/getEventos', [
    // validarJWT
],getEventos);

router.post('/crearEvento', [
    check('title','El titulo no puede quedar vacio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
    // validarJWT
],crearEvento);

router.put('/actualizarEvento/:id', [
    // validarJWT
],actualizarEvento);

router.delete('/eliminarEvento/:id', [
    // validarJWT
],eliminarEvento);

module.exports = router;