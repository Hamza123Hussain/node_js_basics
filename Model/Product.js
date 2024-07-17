import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'ENTER PRODUCT NAME'],
    },
    Quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    Price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    Timestamp: true,
  }
)

const ProductModel = mongoose.model('Product', ProductSchema)

export default ProductModel
