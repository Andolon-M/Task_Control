const { ObjectId } = require('mongodb');
const RemindersRepository = require('../../domain/repositories/remindersRepository.cjs');

class RemindersService {
    constructor() {
        this.remindersRepository = new RemindersRepository();
    }

    async getReminders() {
        const reminders = await this.remindersRepository.getAll();
        if (!reminders) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reminders not found' }));
        }
        return reminders;
    }

    async getReminderById(id) {
        const reminder = await this.remindersRepository.getById(id);
        if (!reminder) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reminder not found' }));
        }
        return reminder;
    }

    async createReminder(data, userId) {
        // Check if the authenticated user exists
        if (!userId) return { message: "User not found" };
        const user = await this.userRepository.getById(userId);
        data.user_fk = user?._id;
        data.status = 'pending';
        data.createdAt = new Date();
        return await this.remindersRepository.save(data);
    }

    async updateReminder(id, data) {
        const updatedReminder = await this.remindersRepository.updateById(id, data);
        if (!updatedReminder) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reminder not found or could not be updated' }));
        }
        return updatedReminder;
    }

    async deleteReminder(id) {
        const deletedReminder = await this.remindersRepository.deleteById(id);
        if (!deletedReminder) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reminder not found or could not be deleted' }));
        }
        return deletedReminder;
    }

    async getRemindersByActivityId(activityId) {
        try {
            const reminders = await this.remindersRepository.findByActivityId(activityId);
            return reminders;
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving reminders for the activity' }));
        }
    }
}

module.exports = RemindersService;
