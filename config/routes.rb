Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  root "home#index"
  get "/snake" => "home#snake"
  get "/*path" => "homepage#index"
end
