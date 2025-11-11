// backend/routes/campaigns.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');

// GET /api/campaigns  (support ?search & ?status)
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) filter.$text = { $search: search };
    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/campaigns
router.post('/', async (req, res) => {
  try {
    const { campaignName, clientName, startDate, status } = req.body;
    if (!campaignName || !clientName || !startDate) {
      return res.status(400).json({ error: 'campaignName, clientName and startDate are required' });
    }
    const doc = await Campaign.create({ campaignName, clientName, startDate, status });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/campaigns/:id
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const doc = await Campaign.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/campaigns/:id
router.delete('/:id', async (req, res) => {
  try {
    const doc = await Campaign.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
