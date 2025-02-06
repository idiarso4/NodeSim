const { TeacherJournal } = require('../models');

const createJournal = async (req, res) => {
  try {
    const { date, subject, class: className, lessonTopic, teachingMaterials, activities, notes } = req.body;
    const journal = await TeacherJournal.create({
      userId: req.user.id,
      date,
      subject,
      class: className,
      lessonTopic,
      teachingMaterials,
      activities,
      notes
    });
    res.status(201).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await TeacherJournal.findByPk(id);
    
    if (!journal) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    
    if (journal.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this journal' });
    }
    
    await journal.update(req.body);
    res.json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJournals = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = {
      userId: req.user.id
    };
    
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }
    
    const journals = await TeacherJournal.findAll({ where });
    res.json(journals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createJournal,
  updateJournal,
  getJournals
};