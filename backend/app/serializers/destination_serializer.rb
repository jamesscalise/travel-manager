class DestinationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :sites
end
