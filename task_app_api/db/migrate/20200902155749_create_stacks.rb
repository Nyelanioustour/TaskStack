class CreateStacks < ActiveRecord::Migration[6.0]
  def change
    create_table :stacks do |t|
      t.string :title
      t.string :category
      t.text :description
      t.integer :length
      t.integer :user_id
      t.timestamps
    end
  end
end
