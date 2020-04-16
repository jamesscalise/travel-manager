class SiteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  belongs_to :destination
end
