class AddsGenderToGifts < ActiveRecord::Migration
  def change
  	add_column :gifts, :gender, :string, :limit => 1
  end
end
