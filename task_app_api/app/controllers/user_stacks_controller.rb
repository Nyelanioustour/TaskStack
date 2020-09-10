class UserStacksController < ApplicationController
    def index
        user_stack = UserStack.all 
        render json: user_stack 
    end

    def create
        user_stack = UserStack.create(strong_params)
        render json: user_stack
    end

    private

    def strong_params
        params.require(:user_stack).permit(:user_id,:stack_id)
    end
end
