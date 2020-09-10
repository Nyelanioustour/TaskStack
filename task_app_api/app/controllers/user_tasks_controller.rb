class UserTasksController < ApplicationController
    def index
        user_task = UserTask.all 
        render json: user_task
    end

    def create
        byebug
        user_task = UserTask.create(strong_params)
        render json: user_task
    end

    private

    def strong_params
        params.require(:user_task).permit(:user_id,:task_id)
    end
end
