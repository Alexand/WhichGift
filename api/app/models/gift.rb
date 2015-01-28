class Gift < ActiveRecord::Base
	has_and_belongs_to_many :categories, join_table: :gifts_categories
	accepts_nested_attributes_for :categories, allow_destroy: true
end
