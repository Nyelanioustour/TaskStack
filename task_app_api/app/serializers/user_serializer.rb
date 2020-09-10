class UserSerializer < ActiveModel::Serializer
    attributes :username, :id, :created_at,:minutes,:stackevents,:calevents
end