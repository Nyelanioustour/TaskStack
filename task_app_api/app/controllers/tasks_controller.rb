class TasksController < ApplicationController
    def index
        tasks = Task.all 
        render json: tasks
    end

    def create
        task = Task.create(strong_params)
        render json: task
    end

    def update
        task = Task.find(params[:id])
        task.update(strong_params)
        render json: task
    end    
end

private

def strong_params
    params.require(:task).permit(:title,:description,:start,:end)
end
