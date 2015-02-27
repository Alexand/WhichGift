json.array!(@feedbacks) do |feedback|
  json.extract! feedback, :id, :name, :email, :comment, :category
  json.url feedback_url(feedback, format: :json)
end
