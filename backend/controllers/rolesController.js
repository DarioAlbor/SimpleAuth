// controllers/rolesController.js
const User = require('../models/user'); // Asegúrate de agregar esta línea

exports.getSellers = async (req, res) => {
    try {
        const sellers = await User.findAll({
            attributes: ['id', 'firstName', 'isActive'],
            where: {
                role: 'Vendedor',
            },
        });

        res.json({ sellers }); // 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de vendedores' });
    }
};
