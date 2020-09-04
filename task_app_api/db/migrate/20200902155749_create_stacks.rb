class CreateStacks < ActiveRecord::Migration[6.0]
  def change
    create_table :stacks do |t|
      t.string :title
      t.string :category
      t.text :description
      t.integer :length
      t.timestamps
    end
  end
end
