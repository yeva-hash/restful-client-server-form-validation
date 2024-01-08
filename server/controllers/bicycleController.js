import BicycleModel from '../models/bicycles.js'

class BicycleController {
    getAll = async(req, res) => {
        try {
            const bicycles = await BicycleModel.find().sort({ status: -1 })

            const stats = await this.getStats(bicycles)

            return res.status(200).json({bicycles, stats});
        } catch (error) {
            res.status(400).json({error});
        }
    }

    create = async(req, res, next) => {
        try {
            const {ID, name, type, color, wheelSize, price, description} = req.body;

            if (!ID || !name || !type || !color || !wheelSize || !price || !description) {
                res.status(400).json({message: 'All fields should be entered'});
            }

            const fondedBicycle = await BicycleModel.findOne({ID});
            if (fondedBicycle) {
                res.status(400).json({message: 'Bike with specified ID already exist'});
            }

            const bicycle = await BicycleModel.create({...req.body, status: 1})

        } catch (error) {
            res.status(400).json({error});
        }
        return next()
    }

    updateStatus = async(req, res, next) => {
        const {ID} = req.params;
        const {status} = req.body;
        try {
            let updatedBicycle = await BicycleModel.findOneAndUpdate(
                { ID: ID },
                { $set: { status } },
                { new: true } 
              );

            if (!updatedBicycle) {
                return res.status(404).json({ error: 'Bicycle not found' });
            }
            
        } catch (error) {
            res.status(400).json({error});
        }

        return next();
    }

    delete = async(req, res, next) => {
        try {
            const { ID } = req.params;
            const deletedBicycle = await BicycleModel.findOneAndDelete({ID});
    
            if (!deletedBicycle) {
                return res.status(404).json({ error: 'Bicycle not found' });
            }

        } catch (error) {
            res.status(400).json({error});
        }
        return next();
    }

    
    getStats = async(bicycles) => {
        const totalCount = await BicycleModel.countDocuments();
        const statusStats = await BicycleModel.aggregate([
            {
                $group: {
                _id: "$status",
                count: { $sum: 1 }
                }
            },
            {
                $project: {
                status: "$_id",
                count: 1,
                _id: 0
                }
            }
        ])
        const [priceStats] = await BicycleModel.aggregate([
            {
                $group: {
                _id: null,
                count: { $sum: 1 },
                totalPrice: { $sum: "$price" }
                }
            },
            {
                $project: {
                average: { $divide: ["$totalPrice", "$count"] },
                _id: 0
                }
            }
        ])

        return {
            totalCount, statusStats, priceStats
        }
    }
}

export default new BicycleController();