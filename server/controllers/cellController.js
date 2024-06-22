const Cell = require('../models/cell');

const getAllCells = async (req, res) => {
  try {
    const cells = await Cell.findAll();
    res.json(cells);
  } catch (error) {
    console.error('Error fetching cells:', error);
    res.status(500).json({ error: 'Error fetching cells' });
  }
};

const createCell = async (req, res) => {
  const { row, column, value } = req.body;
  try {
    const cell = await Cell.create({ row, column, value });
    res.json(cell);
  } catch (error) {
    console.error('Error creating cell:', error); // Log the full error
    res.status(500).json({ error: 'Error creating cell', details: error.message });
  }
};

const updateCell = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const cell = await Cell.findByPk(id);
    if (cell) {
      cell.value = value;
      await cell.save();
      res.json(cell);
    } else {
      res.status(404).json({ error: 'Cell not found' });
    }
  } catch (error) {
    console.error('Error updating cell:', error);
    res.status(500).json({ error: 'Error updating cell' });
  }
};

const deleteCell = async (req, res) => {
  const { id } = req.params;
  try {
    const cell = await Cell.findByPk(id);
    if (cell) {
      await cell.destroy();
      res.json({ message: 'Cell deleted' });
    } else {
      res.status(404).json({ error: 'Cell not found' });
    }
  } catch (error) {
    console.error('Error deleting cell:', error);
    res.status(500).json({ error: 'Error deleting cell' });
  }
};

module.exports = {
  getAllCells,
  createCell,
  updateCell,
  deleteCell,
};
