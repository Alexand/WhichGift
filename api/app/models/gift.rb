class Gift < ActiveRecord::Base
	belongs_to :ageGroup
	has_and_belongs_to_many :categories, join_table: :gifts_categories
	accepts_nested_attributes_for :categories, allow_destroy: true

	has_attached_file :photo, styles: {
    thumb: '100x100>',
    medium: '256x256#',
    large: '512x512>',
    giant: '1024x1024>'
  }

	validates_attachment_file_name :photo, :matches => [/png\Z/, /jpe?g\Z/, /gif\Z/]

	def photo_url
    photo.url(:thumb)
  end
end
