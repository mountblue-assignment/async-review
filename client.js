const fetch = require("node-fetch");

async function main() {
  const response = await fetch("http://localhost:3000/todos?user_id=2");
  const data = await response.json();
  console.log(data);
}
// main();

// write your code here

async function fetchAllUsers(path){
   try{
      const response=await fetch(path);
      const data=await response.json();
      return data;
   }
   catch(error){
    console.error(error);
   }
}

async function fetchFiveUserTodos(start,todos,users){
 //fetch todos for five user continuously ------
 let count=0;
 let index=start;

 for(;index<users.length;index++){
  if(count<=5){
    const response = await fetch(`http://localhost:3000${users[index].todos}`);
    const userTodos = await response.json();
    todos[users[index].id]=userTodos.todos;
    count++;
  }
  else{
    break;
  }
}
return index;
}

async function fetchAllUserTodos(users){

  let todos={};

   let start=0; //tracking of index

   while(start<users.length){
    //fetching five users ----------
      start =await fetchFiveUserTodos(start,todos,users);
       console.log('Fetched five users !');
       await new Promise((resolve)=>setTimeout(resolve,1000));
   }

    return todos;
}


async function  test(){
  
  // Fetch all the users by calling the `/users
   const {users}= await fetchAllUsers('http://localhost:3000/users');
  //  console.log(users);

       //fetching all users todos ------
    const allUserTodos=await fetchAllUserTodos(users);
   
    // console.log(allUserTodos);
  

     let allUserInfo=[];

     for(let userTodos in allUserTodos){
         const eachUserTodo=allUserTodos[userTodos];
         let count=0;
        eachUserTodo.map((todo)=>{
            if(todo.isCompleted){
              count++;
            }
        })
        const userObj=users.filter((user)=>user.id===Number(userTodos)).map((user)=>{

          return {
              id:user.id,
              name:user.name,
              numTodosCompleted:count   
          }
        });
        // console.log(userObj);
        allUserInfo.push(...userObj);
     }
    
     console.log('allUserInfoArr: ',allUserInfo);
} 

test();

// [
//   {
//     id: 1,
//     name: "User 1",
//     numTodosCompleted: 4,
//   },
//   {
//     id: 2,
//     name: "User 2",
//     numTodosCompleted: 3,
//   },
//   {
//     id: 3,
//     name: "User 3",
//     numTodosCompleted: 6,
//   },
// ];


// 14': [
//   {
//     id: 'todo-14-1',
//     text: 'Todo 1 created by 14',
//     isCompleted: false
//   },