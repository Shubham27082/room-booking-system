const db = require('../config/database');

class RoomService {
  async getAllRooms() {
    const [rooms] = await db.execute('SELECT * FROM rooms');
    return rooms;
  }

  async getRoomById(roomId) {
    const [rooms] = await db.execute(
      'SELECT * FROM rooms WHERE id = ?',
      [roomId]
    );
    return rooms[0];
  }
}

module.exports = new RoomService();
