require 'sinatra'

# Controladores
require_relative './earthquake_controller'

# Definición del enrutador
class EarthquakeRouter < Sinatra::Base
    # Ruta GET
    get '/features' do
        get
    end

    # Ruta POST
    post '/features/:feature_id/comments' do
        post
    end
end
