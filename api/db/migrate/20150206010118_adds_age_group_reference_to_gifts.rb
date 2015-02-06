class AddsAgeGroupReferenceToGifts < ActiveRecord::Migration
  def change
  	add_reference :gifts, :ageGroup, index: true
  end
end
