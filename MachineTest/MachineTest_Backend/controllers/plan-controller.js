const MembershipPlan = require('../model/plan');
const HttpError = require('../model/http-error');

exports.createPlan = async (req, res) => {
  try {
    const { planName, duration, fee } = req.body;
    if (!planName || !duration || !fee) {
      throw new HttpError(400, 'Invalid request data');
    }
    const plan = new MembershipPlan(req.body);
    await plan.save();
    res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find().populate('subscribers');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const planId = req.params.id; // Extract planId from request parameters
    const plan = await MembershipPlan.findById(planId).populate('subscribers');
    if (!plan) {
      throw new HttpError(404, 'Plan not found');
    }
    res.json(plan);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const planId = req.params.id; // Extract planId from request parameters
    const plan = await MembershipPlan.findByIdAndUpdate(planId, req.body, { new: true });
    if (!plan) {
      throw new HttpError(404, 'Plan not found');
    }
    res.json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const planId = req.params.id; // Extract planId from request parameters
    const plan = await MembershipPlan.findByIdAndRemove(planId);
    if (!plan) {
      throw new HttpError(404, 'Plan not found');
    }
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// module.exports = { createPlan, getPlans, getPlanById, updatePlan, deletePlan };