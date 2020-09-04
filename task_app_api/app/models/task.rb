class Task < ApplicationRecord
    has_many :users, through: :user_tasks

end
