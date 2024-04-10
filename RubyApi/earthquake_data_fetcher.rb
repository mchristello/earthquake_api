require 'json'
require 'net/http'
require_relative './earthquake'

def get_and_persist_earthquake_data
    begin
        uri = URI('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
        response = Net::HTTP.get_response(uri)
        data = JSON.parse(response.body)

        new_id = 1

        data['features'].each do |feature|
            id = feature['id']
            properties = feature['properties']
            geometry = feature['geometry']

            # Revisar los campos
            next unless properties['title'] && properties['url'] && properties['place'] && properties['magType'] && geometry['coordinates']

            # Validar rangos
            next if properties['mag'] < -1.0 || properties['mag'] > 10.0
            next if geometry['coordinates'][0] < -180.0 || geometry['coordinates'][0] > 180.0 || geometry['coordinates'][1] < -90.0 || geometry['coordinates'][1] > 90.0

            # Validar si el terremoto ya existe
            existing_earthquake = Earthquake.find_by(external_id: id)
            next if existing_earthquake

            # Persistir la información
            earthquake = Earthquake.new(
                id: new_id,
                external_id: id,
                mag: properties['mag'],
                place: properties['place'],
                time: Time.parse(properties['time']),
                url: properties['url'],
                tsunami: properties['tsunami'],
                mag_type: properties['magType'],
                title: properties['title'],
                coordinates: geometry['coordinates'],
                comments: []
            )

            earthquake.save
            new_id += 1
    end

        puts 'Earthquake data persisted successfully'
    rescue StandardError => error
        puts "Error fetching and persisting earthquake data: #{error}"
    end
end
