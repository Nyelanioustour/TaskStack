class CreateUserStacks < ActiveRecord::Migration[6.0]
  def change
    create_table :user_stacks do |t|
      t.integer :user_id
      t.integer :stack_id
      t.integer :time
      t.timestamps
    end
  end
end
