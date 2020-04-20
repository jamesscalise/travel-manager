class DestinationsController < ApplicationController
    def index
        destinations = Destination.all
        render json: DestinationSerializer.new(destinations)
      end
     
      def show
        destination = Destination.find_by(id: params[:id])
        render json: DestinationSerializer.new(destination)
      end

      def create
        destination = Destination.create(name: params[:name])
        if destination.save
          render json: DestinationSerializer.new(destination)
        else
          render json: {message: "Error! Destination couldn't be create in controller!"}
        end


      end
end
