import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const RolSchema = new mongoose.Schema({
    rolId: {
        type: Number,
        unique: true
    },
    rolName: {
        type: String,
        required: [true, 'The field rolName is required'],
        minLength: [3, 'Min 3 characters'],
    },
    rolDescription: {
        type: String,
        required: [true, 'The field rolDescription is required'],
        minLength: [5, 'Min 5 characters'],
    },
    status: {
        type: Boolean,
        default: true
    }
});

RolSchema.plugin(AutoIncrement, { inc_field: 'rolId' });

const Rol = mongoose.model('Rol', RolSchema, 'rol');
export default Rol;
