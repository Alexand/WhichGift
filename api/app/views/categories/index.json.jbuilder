json.array!(@categories) do |category|
  json.extract! category, :id, :name, :father_id
  json.url category_url(category, format: :json)
end
