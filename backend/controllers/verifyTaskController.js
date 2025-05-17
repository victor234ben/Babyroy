const axios = require('axios')
const Task = require('../models/taskModel');
const TaskCompletion = require('../models/taskCompletionModel');

const TELEGRAM_GROUP_USERNAME = process.env.TELEGRAM_GROUP_USERNAME;
const TELEGRAMTOKEN = process.env.TELEGRAM_BOT_TOKEN;

const verifyTelegram = async (req, res) => {
    try {
        const { telegramId, taskId } = req.body;
        console.log("this teid", telegramId, "taskid", taskId)

        if (!telegramId || !taskId) {
            return res.status(400).json({ success: false, message: 'telegramId and taskId are required.' });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found.' });
        }

        let userStatus;
        try {
            const telegramRes = await axios.get(
                `https://api.telegram.org/bot${TELEGRAMTOKEN}/getChatMember`,
                {
                    params: {
                        chat_id: TELEGRAM_GROUP_USERNAME,
                        user_id: telegramId,
                    },
                }
            );

            userStatus = telegramRes?.data?.result?.status;
        } catch (telegramError) {
            console.error('Telegram API Error:', telegramError?.response?.data || telegramError.message);
            return res.status(500).json({ success: false, message: 'Failed to verify Telegram membership.' });
        }

        if (!['member', 'administrator', 'creator'].includes(userStatus)) {
            return res.status(403).json({ success: false, message: 'User has not joined the Telegram group.' });
        }

        // Check if task completion already exists
        let completion = await TaskCompletion.findOne({
            user: req.user._id,
            task: task._id,
        }).select('status submissionData');

        if (!completion) {
            completion = await TaskCompletion.create({
                user: req.user._id,
                task: task._id,
                status: 'approved',
                pointsAwarded: task.pointsReward,
                completedAt: new Date(),
                submissionData: '',
            });
        }

        return res.status(200).json({
            success: true,
            task: {
                ...task._doc,
                userStatus: completion.status,
                userSubmission: completion.submissionData,
            },
        });
    } catch (error) {
        console.error('Unexpected Server Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};


const connectWallet = async (req, res) => {

}

module.exports = { verifyTelegram, connectWallet }