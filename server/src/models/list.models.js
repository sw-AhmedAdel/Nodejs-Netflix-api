const List = require('./list.mongo');

async function CreatNewList (list) {
  const newList = new List(list);
  await newList.save();
  return newList;
}

async function GetAllList(filter , sort , limit , skip){
  return await List.find();
}

async function FindList(filter) {
  return await List.findOne(filter)
}

async function UpdateList (updateList , id) {
  const list = await List.findByIdAndUpdate(id , updateList ,{
    new:true,
    runValidators:true,
  })
  return list
}

async function DeleteList (id) {
  await List.findByIdAndRemove(id)
}

module.exports = {
  CreatNewList,
  GetAllList,
  UpdateList,
  DeleteList,
  FindList,
}