import { Op } from 'sequelize';
// import {  } from 'date-fns/esm';
import { endOfDay, startOfDay, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'user is not a provider' });
    }

    const { date } = req.body;
    const parsedDate = parseISO(date);

    const appointments = Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
