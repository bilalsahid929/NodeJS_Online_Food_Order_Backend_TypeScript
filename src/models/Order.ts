import mongoose, { Schema, Document } from "mongoose";
export interface OrderDoc extends Document {
  orderID: string; // 5948764
  vendorId: string;
  items: [any]; // [f food, unit: 1 }]
  totalAmount: number; //456,
  orderDate: Date;
  paidThrough: string; // COD, Credit Card, Wallet
  paymentResponse: string; // { status: true, response: some bank response}
  orderStatus: string;
  remarks: string;
  deliveryId: string;
  appliedOffers: boolean;
  offerId: string;
  readyTime: number; //max 60 minutes
}
const OrderSchema = new Schema(
  {
    orderID: { type: String, required: true },
    vendorId: { type: String, require: true },
    items: [
      {
        food: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "food",
          required: true,
        },
        unit: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date },
    paidThrough: { type: String },
    paymentResponse: { type: String },
    orderStatus: { type: String },
    remarks: { type: String },
    deliveryId: { type: String },
    appliedOffers: { type: Boolean },
    offerId: { type: String },
    readyTime: { type: Number },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);
const Order = mongoose.model<OrderDoc>("order", OrderSchema);
export { Order };
