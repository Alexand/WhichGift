class AgeGroup < ActiveRecord::Base
	has_and_belongs_to_many :gifts, join_table: :gifts_ageGroups
end
