class TaskSerializer < ActiveModel::Serializer
  attributes :id,:title,:start,:end,:description
end
