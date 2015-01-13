class CreateGifts < ActiveRecord::Migration
  def change
    create_table :gifts do |t|
      t.string :name
      t.decimal :price
      t.text :description
      t.text :site

      t.timestamps
    end
  end
end
