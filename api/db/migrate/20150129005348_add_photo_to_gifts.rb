class AddPhotoToGifts < ActiveRecord::Migration
  def self.up
  	add_attachment :gifts, :photo
  end

  def self.down
  	remove_attachment :gifts, :photo
  end
end
