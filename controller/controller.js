const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const Schema = mongoose.Schema

//User Schema
const UserSignIn = new Schema ({
    Name :String,
    Password:String,
    Task : String
})
const Sign=mongoose.model('UserDetails',UserSignIn)

//For Signin user: 

const signin = async (req,res) => {
  const user = new Sign({
    Name : req.body.Name,
    Password : req.body.Password,
    Task:req.body.Task
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser)
  }
  catch(error){
    res.status(400).send(error)
  }
}

// for Login in :

const login = (req,res) =>{
  var Name = req.body.Name
  var Password = req.body.Password
  Sign.find({Name:Name,Password:Password})
  .exec()
  .then((user)=>{
    if(Object.keys(user).length !== 0){
      const token=jwt.sign({Name},'xyz')
    res.cookie("jwt",token).json({
      message:'You are logged in successfully',
      User:user,
      Token:token
    });
    }else{
      res.send('Invaid username or password..')
    }
  })
  .catch((err)=>{
    res.json({
      Error:err
    })
  })
}


//create task:

const create_task = async (req,res) => {
  const new_task = new Sign ({
    Name : req.body.Name,
    Passoword : req.body.Passoword,
    Task : req.body.Task
  });
  try{
    const saveTask = await new_task.save();
    res.send(saveTask) 
  }catch(err){
    res.status(400).send(err)
  }
}

// see task:

const all_task = async (req,res) => {
  try{
    const tasks = await Sign.find();
    res.json(tasks)
  }catch(err){
    res.json({message:err})
  }
}

//Update task:

const update_task = async (req,res) => {
  try{
    const task = {
      Task : req.body.Task
    };
    const updatetask = await Sign.findByIdAndUpdate(
      {_id: req.params.taskId},task
    );
    res.json(updatetask);
  }
  catch(err){
    res.json({message:err})
  }
}

//Delete task:

const delete_task = async (req, res) => {
  try {
      const removeTask = await Sign.findByIdAndDelete(req.params.taskId);
      res.json(removeTask);
    } catch (error) {
      res.json({ message: error });
    }
};


module.exports = {
  signin,
  login,
  create_task,
  all_task,
  update_task,
  delete_task
}
