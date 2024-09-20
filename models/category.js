import { model, Schema } from 'mongoose';

// Definir el esquema para ejemplares
const SpecimenSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    birthDate: {
        type: Date,
        required: [true, 'The birth date is required'],
    },
    paso: {
        type: String,
        required: [true, 'The paso is required'],
    },
    color: {
        type: String,
        required: [true, 'The color is required'],
    },
    owner: {
        type: String,
        required: [true, 'The owner is required'],
    },
    cedula: {
        type: String,
        required: [true, 'The cedula is required'],
        minLength: [10, 'Min 10 characters'],
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
    } 
});

SpecimenSchema.virtual('ageInMonths').get(function () {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    
    let ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12;
    ageInMonths += today.getMonth() - birthDate.getMonth();

    // Asegurar que el valor no sea negativo si el día de hoy es antes del día de nacimiento
    if (today.getDate() < birthDate.getDate()) {
        ageInMonths--;
    }

    return ageInMonths;
});

// Definir el esquema para categorías
const CategorySchema = new Schema({
    nameCategory: {
        type: String,
        required: [true, 'The field name is required'],
        minLength: [4, 'Min 4 characters'],
    },
    specimens: [SpecimenSchema],  // Array de ejemplares
},{ 
    versionKey: false, 
    toJSON: { virtuals: true },  // Para incluir virtuals en JSON
    toObject: { virtuals: true }  // Para incluir virtuals en objetos
 });

export default model('Category', CategorySchema, 'category');
