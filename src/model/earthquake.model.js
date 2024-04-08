import mongoose from 'mongoose';

const earthquakeSchema = new mongoose.Schema({
            id: String,
            mag: {
                type: Number,
                required: true,
                min: -1.0,
                max: 10.0
            },
            place: {
                type: String,
                required: true
            },
            time: Date,
            url: {
                type: String,
                required: true
            },
            tsunami: Boolean,
            magType: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            coordinates: {
                type: [Number],
                required: true,
            }
            })

        const Earthquake = mongoose.model('earthquakes', earthquakeSchema);

        export default Earthquake;