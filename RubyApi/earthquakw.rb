require 'mongoid'

class Earthquake
    include Mongoid::Document
    include Mongoid::Timestamps

    field :id, type: Integer
    field :external_id, type: String
    field :mag, type: Float
    field :place, type: String
    field :time, type: DateTime
    field :url, type: String
    field :tsunami, type: Mongoid::Boolean
    field :magType, type: String
    field :title, type: String
    field :coordinates, type: Array
    field :comments, type: Array, default: []

    validates :mag, presence: true, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
    validates :place, :url, :magType, :title, presence: true

end