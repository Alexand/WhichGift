class GiftsAndAgeGroups < ActiveRecord::Migration
  def self.up
  	create_table :gifts_ageGroups, id: false do |t|
      t.belongs_to :gift, index: true
      t.belongs_to :ageGroup, index: true
    end
  end

  def self.down
    drop_table :gifts_ageGroups
  end
end
