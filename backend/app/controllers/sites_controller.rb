class SitesController < ApplicationController
    def index
        sites = Site.all
        render json: SiteSerializer.new(sites)
      end
     
      def show
        site = Site.find_by(id: params[:id])
        render json: SiteSerializer.new(site)
      end

      def create
        site = Site.create(name: params[:name], destination_id: params[:destination_id])
      end
end
