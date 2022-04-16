const {
  CreatNewList,
  GetAllList,
  UpdateList,
  DeleteList,
  FindList,
} = require('../../models/list.models');
const appError = require('../../handelErros/class.handel.errors')
const filterFeaturs = require('../../services/class.filter')
const {FindMovie} = require('../../models/movie.models');

async function httpCreatNewList (req ,res ,next) {
  const list = req.body;
  console.log(list)
  const newList = await CreatNewList(list);
  return res.status(200).json({
    status:'success',
    data: newList
  })
}

async function httpGeTAllList(req ,res ,next) {
  const filter = {...req.query};
  const execludeFileds = ['page','sort','limit'];
  execludeFileds.forEach((el) => delete filter[el]);
  const features = new filterFeaturs(req.query , filter);

  const finalFilter = features.filterFun();
  const sortBy = features.sortBy();
  const {limit , skip} =features.getPagination();
  const lists= await GetAllList(finalFilter , sortBy , limit ,skip);
  return res.status(200).json({
    status:'success',
    data: lists
  })

}

async function httpFindList (req ,res ,next) {
  const {listid} = req.params;
  const list = await FindList({
    _id : listid,
  })
  if(!list) {
    return next(new appError('List is not found'));
  }
  return res.status(200).json({
    status:'success',
    data:list
  })
}

async function httpUdateList (req ,res ,next) {
  const {listid} = req.params;
  const is_exits = await FindList({
    _id : listid,
  })
  if(!is_exits) {
    return next(new appError('List is not found'));
  }

  if(req.body.content) {
    return next (new appError('You can not update movie in the list, please update it using its route'));
  }
  const list = await UpdateList(req.body ,listid );
  return res.status(200).json({
    status:'success',
    data:list
  })
}

async function httpDeleteList  (req ,res ,next) {
  const {listid} = req.params;
  const is_exits = await FindList({
    _id : listid,
  })
  if(!is_exits) {
    return next(new appError('List is not found'));
  }

  await DeleteList(listid );
  return res.status(200).json({
    status:'success',
    message:"List has been deleted"
  })
}

async function httpAddMovieToList(req ,res ,next) {
  const {listid} = req.params;
  const {movieid} = req.params;
  const list = await FindList({
    _id: listid
  });
  if(!list) {
    return next(new appError('List is not exits'));
  }
 
  const movie = await FindMovie({
    _id:movieid
  })
  if(!movie) {
    return next(new appError('Movie is not exits'));
  }
 
   for(const mov of list.content ){
    if(mov._id.toString() === movieid.toString()) 
    return next(new appError('This movie is on the list'))
  }

  list.content = [...list.content , movieid];
  await list.save();
  return res.status(200).json({
    status:'success',
    message:`${movie.title} added to ${list.title}`,
    reaults:list.content.length
  })
}


async function httpRemoveMovieFromList(req ,res , next){
  const {listid} = req.params;
  const {movieid} = req.params;
  const list = await FindList({
    _id: listid
  });
  if(!list) {
    return next(new appError('List is not exits'));
  }
  list.content = list.content.filter((mov) => {
    mov._id.toString() !==movieid.toString();
  })
  await list.save();
  return res.status(200).json({
    status:'success',
    message:'Movie has been deleted'
  })
}


module.exports = {
  httpCreatNewList,
  httpGeTAllList,
  httpUdateList,
  httpDeleteList,
  httpFindList,
  httpAddMovieToList,
  httpRemoveMovieFromList,
  httpRemoveMovieFromList
}