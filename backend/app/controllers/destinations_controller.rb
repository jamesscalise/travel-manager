class DestinationsController < ApplicationController
    def index
        destinations = Destination.all
        render json: DestinationSerializer.new(destinations)
      end
     
      def show
        destination = Destination.find_by(id: params[:id])
        render json: DestinationSerializer.new(destination)
      end
end
