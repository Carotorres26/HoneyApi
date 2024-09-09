import { model, Schema } from 'mongoose'

const ServiceSchema = new Schema({
    nameService: {
        type: String,
        required:[true, 'The field names is required'],
        minLength :[3, 'Min 3 characters'],
    },
    price: {
        type: Number,
        required:[true, 'The field price is required'],
    }
}) 

export default model('Service',ServiceSchema,'service')//primero define la clase, el segundo al nombre de la esquema, tercero nombre de la collection