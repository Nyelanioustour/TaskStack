class StackSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :length, :category
end
