import Earthquake from '../model/earthquake.model.js';
import axios from 'axios';


export const getAndPersistEarthquakeData = async () => {
    try {
        const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
        const features = response.data.features;

        const lastFeature = await Earthquake.findOne({}, {}, { sort: { 'id': -1 }})
        let newId = lastFeature ? lastFeature.id + 1 : 1;
        
        for (const feature of features) {
            const {
                id,
                properties,
                geometry
            } = feature;

            // Revisar los campos
            if (!properties.title || !properties.url || !properties.place || !properties.magType || !geometry.coordinates) {
                continue;
            }

            // Validar rangos
            if (properties.mag < -1.0 || properties.mag > 10.0) continue;
            if (geometry.coordinates[0] < -180.0 || geometry.coordinates[0] > 180.0 || geometry.coordinates[1] < -90.0 || geometry.coordinates[1] > 90.0) continue;

            // Valodar si el terremoto ya existe
            const existingEarthquake = await Earthquake.findOne({ external_id: id });
            // console.log({existingEarthquake});
            if (existingEarthquake) continue;

            // Persistir la info
            const earthquake = new Earthquake({
                id: newId,
                external_id: id,
                mag: properties.mag,
                place: properties.place,
                time: new Date(properties.time),
                url: properties.url,
                tsunami: properties.tsunami,
                magType: properties.magType,
                title: properties.title,
                coordinates: geometry.coordinates,
                comments: []
            });

            await earthquake.save();

            newId++;
        }
        console.log('Earthquake data persisted successfully');
    } catch (error) {
        console.error('Error fetching and persisting earthquake data:', error);
    }
};