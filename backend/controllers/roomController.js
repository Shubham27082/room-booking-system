const roomService = require('../services/roomService');

class RoomController {
  async getAllRooms(req, res) {
    try {
      const rooms = await roomService.getAllRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new RoomController();
