const Payment = require('../schema/Payment');
class PaymentService {
    async addPayment({ billID, paymentFee, userID }) {
        try {

            const newPayment = new Payment({ billID, paymentFee, paymentCreatedUser: userID });
            await newPayment.save();


            return {
                status: 'success',
                message: 'Add payment successfully',
            }

        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }

    async getPayments() {
        try {
            const payments = await Payment.find();
            if (!payments) {
                return {
                    status: 'error',
                    message: 'No payment found',
                };
            }
            return {
                status: 'success',
                message: 'Get payments successfully',
                data: payments,
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }

    async getWeeklyIncome() {
        try {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay() + 1);
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() - today.getDay() + 7);
            endOfWeek.setHours(23, 59, 59, 999);

            const weeklyIncome = await Payment.aggregate([
                {
                    $match: {
                        paymentCreatedDateTime: {
                            $gte: startOfWeek,
                            $lte: endOfWeek,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToParts: { date: '$paymentCreatedDateTime' },
                        },
                        totalIncome: { $sum: '$paymentFee' },
                    },
                },
                {
                    $addFields: {
                        _id: {
                            $dateFromParts: {
                                year: '$_id.year',
                                month: '$_id.month',
                                day: '$_id.day',
                            },
                        },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);

            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const result = [];

            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);

                const dayName = weekdays[day.getDay()]; // Get the day name
                const dayIncome = weeklyIncome.find(w => {
                    const incomeDate = new Date(w._id);
                    return incomeDate.toDateString() === day.toDateString();
                });

                result.push({
                    day: dayName, // Day name (e.g., Monday)
                    income: dayIncome ? dayIncome.totalIncome : 0, // Income for the day
                });
            }

            return {
                status: 'success',
                message: 'Weekly income retrieved successfully',
                data: result,
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }
}

module.exports = new PaymentService;