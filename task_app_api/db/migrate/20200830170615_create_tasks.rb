class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title 
      t.string :description 
      t.string :start 
      t.string :color
      t.string :end
      t.integer :user_id 

      t.timestamps
    end
  end
end
