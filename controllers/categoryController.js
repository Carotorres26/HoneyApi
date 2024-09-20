import Category from '../models/category.js';

export async function getCategory(req, res) {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getSpecimenById(req, res) {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ "specimens._id": id }, { "specimens.$": 1 });

        if (!category || category.specimens.length === 0) {
            return res.status(404).json({ msg: 'Specimen not found' });
        }

        // Convertir el ejemplar a un objeto JSON para incluir los virtuals
        const specimen = category.specimens[0].toJSON(); 

        res.json(specimen);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching specimen', error: error.message });
    }
}

export async function getSpecimenByName(req, res) {
    const { name } = req.params;
    try {
        const categories = await Category.find({ "specimens.name": name }, { "specimens.$": 1 });
        if (categories.length === 0) {
            return res.status(404).json({ msg: 'Specimen not found' });
        }

        // Convertir cada ejemplar a JSON para incluir los virtuals
        const specimens = categories.map(category => category.specimens[0].toJSON());

        res.json(specimens);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching specimen', error: error.message });
    }
}

export async function postCategory(req, res) {
    console.log('Request Body:', req.body); 
    const body = req.body;
    try {
        const category = new Category(body); 
        await category.save(); 
        res.status(201).json({ msg: 'Category inserted successfully' });
    } catch (error) {
        res.status(400).json({ msg: 'Error inserting category', error: error.message });
    }
}

export async function addSpecimen(req, res) {
    const { categoryId, specimen } = req.body; // Destructuración del cuerpo de la solicitud
    try {
        const category = await Category.findById(categoryId); // Buscar la categoría por su ID

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Agregar el nuevo ejemplar al array de specimens
        category.specimens.push(specimen);

        await category.save(); // Guardar la categoría con el nuevo ejemplar
        res.json({ msg: 'Specimen added successfully', category });
    } catch (error) {
        res.status(500).json({ msg: 'Error adding specimen', error: error.message });
    }
}

export async function editSpecimen(req, res) {
    const { categoryId, specimenId, updatedSpecimen } = req.body; // Destructuración del cuerpo de la solicitud
    try {
        const category = await Category.findById(categoryId); // Buscar la categoría por su ID

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Buscar el ejemplar por su ID dentro del array de specimens
        const specimen = category.specimens.id(specimenId);

        if (!specimen) {
            return res.status(404).json({ msg: 'Specimen not found' });
        }

        // Actualizar los campos del ejemplar
        specimen.name = updatedSpecimen.name || specimen.name;
        specimen.birthDate = updatedSpecimen.birthDate || specimen.birthDate;
        specimen.paso = updatedSpecimen.paso || specimen.paso;
        specimen.color = updatedSpecimen.color || specimen.color;
        specimen.owner = updatedSpecimen.owner || specimen.owner;
        specimen.cedula = updatedSpecimen.cedula || specimen.cedula;
        specimen.email = updatedSpecimen.email || specimen.email;

        await category.save(); // Guardar los cambios en la categoría
        res.json({ msg: 'Specimen updated successfully', category });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating specimen', error: error.message });
    }
}

export async function putCategory(req, res) {
    const { _id, nameCategory, specimens } = req.body; 
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            _id, 
            { nameCategory, specimens }, 
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json({ msg: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(400).json({ msg: 'Error updating category', error: error.message });
    }
}

export async function moveSpecimen(req, res) {
    const { fromCategoryId, toCategoryId, specimenId } = req.body;

    try {
        // Buscar la categoría origen (de la que se moverá el ejemplar)
        const fromCategory = await Category.findById(fromCategoryId);
        if (!fromCategory) {
            return res.status(404).json({ msg: 'Source category not found' });
        }

        // Buscar el ejemplar en la categoría origen
        const specimen = fromCategory.specimens.id(specimenId);
        if (!specimen) {
            return res.status(404).json({ msg: 'Specimen not found in source category' });
        }

        // Eliminar el ejemplar de la categoría origen
        fromCategory.specimens.pull(specimenId);
        await fromCategory.save();

        // Buscar la categoría destino (a la que se moverá el ejemplar)
        const toCategory = await Category.findById(toCategoryId);
        if (!toCategory) {
            return res.status(404).json({ msg: 'Destination category not found' });
        }

        // Agregar el ejemplar a la categoría destino
        toCategory.specimens.push(specimen);
        await toCategory.save();

        res.json({ msg: 'Specimen moved successfully', fromCategory, toCategory });
    } catch (error) {
        res.status(500).json({ msg: 'Error moving specimen', error: error.message });
    }
}

export async function deleteCategory(req, res) {
    const _id = req.params.id;
    try {
        const category = await Category.findById(_id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        if (category.specimens.length > 0) {
            return res.status(400).json({ msg: 'This category cannot be deleted if there are existing specimens' });
        }

        await Category.findByIdAndDelete(_id); 
        res.json({ msg: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'There was a problem deleting the category', error: error.message });
    }
}
