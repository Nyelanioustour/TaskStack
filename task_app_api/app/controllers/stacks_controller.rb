class StacksController < ApplicationController
    def index
        stacks = Stack.all 
        render json: stacks
    end
end
