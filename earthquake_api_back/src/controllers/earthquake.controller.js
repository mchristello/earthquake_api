import Earthquake from "../model/earthquake.model.js";


export const get = async(req, res) => {
    try {
        
        const { mag_type, page, per_page } = req.query;

        const currentPage = page || 1;
        const limit = parseInt(per_page) <= 1000 ? parseInt(per_page) : 1000;
        const skip = (currentPage -1) * limit;

        // Objetos para filtro
        const filter = {};
        if (mag_type) {
            const magType = Array.isArray(mag_type) ? mag_type : [mag_type];
            filter.magType ={ $in : magType }
        };

        // Consulta con la paginación y el filter
        const earthquakes = await Earthquake.find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ time: -1 });

        // Armar el array
        const features = earthquakes.map( (e, index) => ({
            id: e.id,
            type: 'feauture',
            attributes: {
                external_id: e.external_id,
                magnitude: e.mag,
                place: e.place,
                time: e.time.toLocaleString(),
                tsunami: e.tsunami,
                mag_type: e.magType,
                title: e.title,
                coordinates: {
                    longitude: e.coordinates[0],
                    latitude: e.coordinates[1]
                },
                comments: e.comments
            },
            links: {
                external_url: e.url
            }
        }))

        return res.status(200).json({
            data: features,
            pagination: {
                current_page: currentPage,
                total: await Earthquake.countDocuments(filter),
                per_page: limit
            }
        });
            
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Failed to get de terremotos', payload: error.message });
    }
}

export const post = async(req, res) => {
    try {
        const { feature_id } = req.params;
        const { body } = req.body;

        if (!body) {
            return res.status(400).send({ status: 'error', message: 'El cuerpo del comentario es requerido' });
        }

        const features = await Earthquake.find({ id: feature_id })
        if (!features) return res.status(400).send({ status: 'error', message: 'features no encontrado' });

        features[0].comments.push({ body })

        await features[0].save();

        return res.status(200).send({ status: 'success', message: 'Comentario creado y guardado.', payload: {
            feature_id: feature_id,
            body: body
        }});
        
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Failed to post terremotos', payload: error.message });
    }
}
