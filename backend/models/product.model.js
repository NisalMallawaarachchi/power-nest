import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: false,
        default: 'https://via.placeholder.com/150'
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

export default Product;