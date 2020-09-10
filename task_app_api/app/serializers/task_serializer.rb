class TaskSerializer < ActiveModel::Serializer
  attributes :id,:title,:color,:start,:end,:description,:user_id
end
