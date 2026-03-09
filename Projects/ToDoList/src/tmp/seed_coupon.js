require('dotenv').config();
const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: String,
    discount_type: { type: String, enum: ["percentage", "fixed"] },
    discount_value: Number,
    min_order_amount: { type: Number, default: 0 },
    max_order_amount: { type: Number, default: 0 },
    usage_limit: { type: Number },
    usage_per_user: { type: Number, default: 1 },
    start_date: { type: Date },
    end_date: { type: Date },
    isActive: { type: Boolean, default: true },
    created_At: Date,
});

const couponModel = mongoose.model("coupons", CouponSchema);

async function seed() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todolist');
    console.log('Connected to MongoDB');

    const coupon = {
        code: 'BOAT200',
        description: 'Flat 200 off',
        discount_type: 'fixed',
        discount_value: 200,
        isActive: true,
        created_At: new Date()
    };

    try {
        await couponModel.findOneAndUpdate({ code: 'BOAT200' }, coupon, { upsert: true, new: true });
        console.log('Coupon BOAT200 seeded successfully');
    } catch (err) {
        console.error('Error seeding coupon:', err);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
