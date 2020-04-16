class SitesController < ApplicationController
    def index
        sites = Site.all
        render json: SiteSerializer.new(sites)
      end
     
      def show
        site = Site.find_by(id: params[:id])
        render json: SiteSerializer.new(site)
      end
end
