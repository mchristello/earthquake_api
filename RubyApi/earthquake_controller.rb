def get(req, res)
    begin
        mag_type = req.query[:mag_type]
        page = req.query[:page].to_i
        per_page = req.query[:per_page].to_i

        currentPage = page != 0 ? page : 1
        limit = per_page <= 1000 ? per_page : 1000
        skip = (currentPage - 1) * limit

        # Objeto para filtro
        filter = {}
        if mag_type
        magType = mag_type.is_a?(Array) ? mag_type : [mag_type]
        filter[:magType] = { '$in': magType }
        end

        # Consulta con paginación y filtro
        earthquakes = Earthquake.where(filter)
                                .limit(limit)
                                .skip(skip)
                                .order(time: :desc)

        # Construir el array
        features = earthquakes.map do |e|
        {
            id: e.id,
            type: 'feauture',
            attributes: {
            external_id: e.external_id,
            magnitude: e.mag,
            place: e.place,
            time: e.time.iso8601,
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
        }
        end

        res.status(200).json(
        data: features,
        pagination: {
            current_page: currentPage,
            total: Earthquake.where(filter).count_documents,
            per_page: limit
        }
        )

    rescue StandardError => error
        res.status(500).send(status: 'error', message: 'Failed to get de terremotos', payload: error.message)
    end
end

def post(req, res)
    begin
    feature_id = req.params[:feature_id]
    body = req.body['body']

    unless body
        return res.status(400).send(status: 'error', message: 'El cuerpo del comentario es requerido')
    end

    features = Earthquake.where(id: feature_id)
    return res.status(400).send(status: 'error', message: 'features no encontrado') if features.empty?

    features[0].comments.push(body)

    puts 'DESPUES DEL PUSH', features
    features[0].save

    res.status(200).send(status: 'success', message: 'Comentario creado y guardado.', payload: {
        feature_id: feature_id,
        body: body
    })

    rescue StandardError => error
    res.status(500).send(status: 'error', message: 'Failed to post terremotos', payload: error.message)
    end
end
