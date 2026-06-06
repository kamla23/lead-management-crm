
import Lead from "../models/Lead.js";
import { validateLead } from "../validations/leadValidation.js";

export const createLead = async (req, res) => {
  const errors = validateLead(req.body);

  if (errors) {
    return res.status(400).json({ errors });
  }

  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
};


export const getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const status = req.query.status || "";
    const limit = 5;
    const skip = (page - 1) * limit;

    let query = {};
    if (status && status !== "") {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalLeads = await Lead.countDocuments(query);

 
    res.json({
      leads,
      totalPages: Math.ceil(totalLeads / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({ message: "Lead not found" });
  }

  res.json(lead);
};

export const updateLead = async (req, res) => {
  const errors = validateLead(req.body);

  if (errors) {
    return res.status(400).json({ errors });
  }

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(lead);
};

export const deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
};

export const searchLeads = async (req, res) => {
  try {
    const keyword = req.query.query || req.query.search; 
    const status = req.query.status || "";
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    if (!keyword && !status) {
      return res.status(400).json({
        message: "Search query or status is required",
      });
    }

    let query = {};

   
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

  
    if (status && status !== "") {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalLeads = await Lead.countDocuments(query);

   
    res.json({
      leads,
      totalPages: Math.ceil(totalLeads / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStats = async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

   
    const result = { total: 0, New: 0, Contacted: 0, Qualified: 0, Converted: 0, Lost: 0 };
    
    stats.forEach(item => {
      if (item._id) {
        result[item._id] = item.count;
        result.total += item.count;
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};