class GiftsAndCategories < ActiveRecord::Migration
  def change
  	create_table :gifts_categories, id: false do |t|
      t.belongs_to :gift, index: true
      t.belongs_to :category, index: true
    end
  end
end
