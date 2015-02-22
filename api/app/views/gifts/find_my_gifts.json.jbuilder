json.array!(@gifts) do |gift|
  json.extract! gift, :id, :name, :price, :description, :site, :photo_thumb_url, :photo_medium_url, :photo_large_url, :photo_giant_url
  json.url gift_url(gift, format: :json)
end