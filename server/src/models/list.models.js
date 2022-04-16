const List = require('./list.mongo');
const fs = require('fs');
const path = require('path');

async function loadAllLists() {
  const lists = JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','data','lists.json')));
  await List.create(lists);
  console.log('loaded all lists');
}

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

async function GetListsMoviesInHomePage(typeQuery , genreQuery) {

  let lists;
  if(typeQuery) {// movies or serios
  // if user did not choose serios or movie, in  in else i will get 10 list of randmon list
   if(genreQuery) {
    lists = await List.aggregate([
      {$match: {type:typeQuery , genre: genreQuery} } ,
      {$sample:{size : 10}}
    ])
   }
   else {
     lists = await List.aggregate([
       {$match: {type:typeQuery} },
       {$sample:{size : 10}}
     ])
   }
  }
  //////////////
  else {
  lists = await List.aggregate([
    {
      $sample:{size : 10}
    }
  ])
  }
  return lists
}

module.exports = {
  CreatNewList,
  GetAllList,
  UpdateList,
  DeleteList,
  FindList,
  loadAllLists,
  GetListsMoviesInHomePage
}