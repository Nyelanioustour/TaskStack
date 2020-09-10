class StacksController < ApplicationController
    def index
        stacks = Stack.all 
        render json: stacks
    end

    def create
        stack = Stack.create(strong_params)
        render json: stack
    end

    def destroy
        stack = Stack.find(params[:id])
        stack.destroy()
    end

private

def strong_params
    params.require(:stack).permit(:title,:description,:length,:category,:user_id)
end

    
end
