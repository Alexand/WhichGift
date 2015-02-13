json.array!(@gifts) do |gift|
  json.extract! gift, :id, :name, :price, :description, :site, :photo_url
  json.url gift_url(gift, format: :json)
end