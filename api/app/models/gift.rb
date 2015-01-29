class Gift < ActiveRecord::Base
	has_and_belongs_to_many :categories, join_table: :gifts_categories
	accepts_nested_attributes_for :categories, allow_destroy: true

	has_attached_file :photo, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }

	validates_attachment_file_name :photo, :matches => [/png\Z/, /jpe?g\Z/, /gif\Z/]
end
