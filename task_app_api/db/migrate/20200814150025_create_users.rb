class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :calevents
      t.integer :stackevents
      t.integer :minutes

      t.timestamps
    end
  end
end
