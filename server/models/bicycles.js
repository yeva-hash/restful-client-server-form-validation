import mongoose from 'mongoose';

const BicycleSchema = new mongoose.Schema({
    ID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    wheelSize: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['1', '0', '-1'], default: '1' },  
})

export default mongoose.model('Bicycle', BicycleSchema);