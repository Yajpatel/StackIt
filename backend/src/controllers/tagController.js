import Tag from '../models/Tag.js';

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag not found' });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ error: 'Tag not found' });
    res.json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag not found' });
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 