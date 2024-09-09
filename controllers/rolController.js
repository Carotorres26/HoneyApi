import Rol from '../models/rol.js';

// Obtener todos los roles
export async function getRol(req, res) {
    try {
        const roles = await Rol.find(); // Utiliza el método `find` del modelo `Rol`
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un rol
export async function postRol(req, res) {
    console.log('Request Body:', req.body); // Agrega este log
    const body = req.body; // Obtener el cuerpo enviado
    try {
        const rol = new Rol(body); // Crear el objeto Rol en RAM
        await rol.save(); // Insertar el objeto en la colección
        res.status(201).json({ msg: 'Rol inserted successfully' });
    } catch (error) {
        res.status(400).json({ msg: 'Error inserting role', error: error.message });
    }
}

// Actualizar un rol
export async function putRol(req, res) {
    const { _id, rolName, rolDescription, status } = req.body; // Destructuración
    try {
        const updatedRol = await Rol.findByIdAndUpdate(_id, { rolName, rolDescription, status }, { new: true });
        if (!updatedRol) {
            return res.status(404).json({ msg: 'Rol not found' });
        }
        res.json({ msg: 'Rol updated successfully', rol: updatedRol });
    } catch (error) {
        res.status(400).json({ msg: 'Error updating role', error: error.message });
    }
}

// Eliminar un rol solo si no está activo
export async function deleteRol(req, res) {
    const _id = req.params.id; // Obtener el parámetro _id
    try {
        const rol = await Rol.findById(_id);
        if (!rol) {
            return res.status(404).json({ msg: 'Rol not found' });
        }

        if (rol.status) {
            return res.status(400).json({ msg: 'Cannot delete an active role' });
        }

        await Rol.findByIdAndDelete(_id); // Eliminar el rol por ID
        res.json({ msg: 'Rol deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'There was a problem deleting the role', error: error.message });
    }
}
