import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDTO) {
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
