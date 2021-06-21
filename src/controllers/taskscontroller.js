import Task from '../models/Task';
import {getPaginations} from '../libs/getPagination';

export const findAllTasks = async (req, res) => {
  try {
    const {size, page, title} = req.query;
    const condition = title 
    ? {
      title: { $regex: new RegExp(title), $options: 'i'}
    }
    : {};
    const {limit, offset} = getPaginations(page, size);
    const data = await Task.paginate(condition, {offset, limit});
    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1
    });
  } catch (error) {
    res.status(500).json({
      menssage: error.menssage || 'Something goes wrong retrievingthe task'
    })
  }
};

export const createTask = async (req, res) => {
  
  if(!req.body.title) {
    return res.satus(400).json({
      menssage: 'Content cannot be empty'
    });
  }
  
  try {
    const newTask = await new Task({ 
    title: req.body.title, 
    description: req.body.description,
    done: req.body.done ? req.body.done : false
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.satus(500).json({
      menssage: error.menssage || 'Something goes wrong creating a task'
    });
  }
}

export const findAllDoneTasks = async (req, res) => {
  const tasks = await Task.find({done: true})
  res.json(tasks);
}

export const findOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({
        menssage: `Task with id ${id} does not exists`
      });
    }
    res.json(task);
  } catch (error) {
    res.satus(500).json({
      menssage: error.menssage || `Error retrieving task with id: ${id}`
    });
  }
}

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    res.json({
      menssage: `${task.id} Task were deletes successfully.`
    });
  } catch (error) {
    res.satus(500).json({
      menssage: error.menssage || `Error deleting task with id: ${id}`
    });
  }
}

export const  updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    menssage: 'Task were updated successfully'
  })
}