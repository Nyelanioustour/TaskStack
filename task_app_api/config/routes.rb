Rails.application.routes.draw do
  resources :user_stacks
  resources :stacks
  resources :user_tasks
  resources :tasks
  resources :users

  post "/login", to: "users#login"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
