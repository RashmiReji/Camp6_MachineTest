const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const membershipPlanSchema = new Schema({
  planName: { type: String, required: true },
  duration: { type: Number, required: true },
  fee: { type: Number, required: true },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema);