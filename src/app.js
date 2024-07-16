
import "./main.css";


window.handleBtnToggleSplit = (event) =>{
  event.target.closest('.drag-item').classList.toggle("split-size");
  event.target.closest('.drag-item').classList.toggle("full-size");
}

window.handleBtnToggleDelete= (event) =>{
  event.target.closest('.drag-item').classList.toggle("deleted");
  event.target.closest('.drag-item').classList.toggle("active");

  let deletedList = document.getElementById('deletedList');
  let dragList = document.getElementById('dragList');

    if(event.target.closest('.drag-item').classList.contains("deleted")){

      let itemToDelete = event.target.closest('.drag-item');
      itemToDelete.draggable  = false;

      deletedList.appendChild(itemToDelete);
      
    }
    else{

      let itemToRestore = event.target.closest('.drag-item');

      let items = getAllItemsToDrag(dragList);
      let sortedItems = items.sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order));

      let lastItem = sortedItems[sortedItems.length - 1];
      let lastOrder = parseInt(lastItem.style.order);

      itemToRestore.style.order = lastOrder + 1;

      itemToRestore.draggable  = true;

      dragList.appendChild(itemToRestore);
      
    }






     dragList = document.getElementById('dragList');
     let items = getAllItemsToDrag(dragList);

    items.forEach((item, index) => {
      let body = item.querySelector('.body');

      item.style.order = index;



      body.innerHTML = item.style.order;
    });

     deletedList = document.getElementById('deletedList');
    let deletedItems = getAllItemsToDrag(deletedList);

    deletedItems.forEach((item, index) => {
     let body = item.querySelector('.body');
     body.innerHTML = item.style.order;
   });

}


let jsonData = null;

window.handleRoleChange = (event) =>{
   const dragList = document.getElementById('dragList');

  //   let allChildren = Array.from(dragList.children);
  //   let items = [];

  //   allChildren.forEach((item, index) => {
  //     if(item.classList.contains('drag-item')) {
  //       items.push(item);
  //     }
  //   });

    let items = getAllItemsToDrag(dragList);

    clearDeletedList();

    reorder(event.target.value, items,jsonData);
    setDeletedItems(event.target.value, items,jsonData);

    items.forEach((item, index) => {
      let body = item.querySelector('.body');
      body.innerHTML = item.style.order;
    });

}


window.handleBtnToggleReorganize = (event) =>{
  const dragList = document.getElementById('dragList');

  dragList.parentElement.classList.toggle("reorder");
  dragList.classList.toggle("reorder");


  document.getElementById('saveReorganize').classList.remove("hide-element");
  document.getElementById('cancelReorganize').classList.remove("hide-element");
  document.getElementById('startReorganize').classList.add("hide-element");


  let btnList = Array.from(document.getElementsByClassName("manageBtn"));

  btnList.forEach((btn, index) => {


    btn.classList.remove("hide-element");




  });





  let items = getAllItemsToDrag(dragList);

  // let allChildren = Array.from(dragList.children);
  // let items = [];

  // allChildren.forEach((item, index) => {
  //   if(item.classList.contains('drag-item')) {
  //     items.push(item);
  //   }
  // });


  

  items.forEach((item, index) => {
      item.draggable  = !item.draggable;
   });

  if(dragList.classList.contains("reorder")){
      dragList.addEventListener('dragstart', handleDragStart);
     dragList.addEventListener('dragover', handleDragOver);
      dragList.addEventListener('drop', handleDrop);
  }
  else{
      dragList.removeEventListener('dragstart', handleDragStart);
      dragList.removeEventListener('dragover', handleDragOver);
      dragList.removeEventListener('drop', handleDrop);

      document.getElementById('saveReorganize').classList.add("hide-element");
      document.getElementById('cancelReorganize').classList.add("hide-element");
      document.getElementById('startReorganize').classList.remove("hide-element");

    }
}

window.handleBtnCancelReorganize = (event) =>{

  const dragList = document.getElementById('dragList');
  const deletedList = document.getElementById('deletedList');

  dragList.parentElement.classList.remove("reorder");
  dragList.classList.remove("reorder");


  let deletedItems = getAllItemsToDrag(deletedList);

  deletedItems.forEach((deletedItem, index) => {
    deletedItem.classList.remove("deleted");
    dragList.appendChild(deletedItem);
  });


  let items = getAllItemsToDrag(dragList);


  

document.getElementById('saveReorganize').classList.add("hide-element");
document.getElementById('cancelReorganize').classList.add("hide-element");
document.getElementById('startReorganize').classList.remove("hide-element");

  // let allChildren = Array.from(dragList.children);
  // let items = [];

  // allChildren.forEach((item, index) => {
  //   if(item.classList.contains('drag-item')) {
  //     items.push(item);
  //   }
  // });

  let btnList = Array.from(document.getElementsByClassName("manageBtn"));

  btnList.forEach((btn, index) => {


    btn.classList.add("hide-element");




  });

  items.forEach((item, index) => {
      item.draggable  = false;
   });


      dragList.removeEventListener('dragstart', handleDragStart);
      dragList.removeEventListener('dragover', handleDragOver);
      dragList.removeEventListener('drop', handleDrop);


      clearDeletedList();
      reorder(document.getElementById("roleList").value, items,jsonData);

      setDeletedItems(document.getElementById("roleList").value, items,jsonData);


      items.forEach((item, index) => {
        let body = item.querySelector('.body');
        body.innerHTML = item.style.order;
      });


    
}

let draggedItem = null;
let draggedItemIndex = null;



function getAllItemsToDrag(dragList){
 

  let allChildren = Array.from(dragList.children);
  let items = [];

  allChildren.forEach((item, index) => {


          if(item.classList.contains('drag-item')) {
            items.push(item);
          }
      
    }

  );

  return items;

}


function handleDragStart(event) {

  let dragList = document.getElementById('dragList');

  console.log('drag start');

  console.log(event.target);

  draggedItem = event.target;

  let allChildren = Array.from(dragList.children);
  let children = [];

  allChildren.forEach((item, index) => {
    if(item.classList.contains('drag-item')) {
      children.push(item);
    }
  });

  let sortedItems = children.sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order));


  draggedItemIndex = sortedItems.indexOf(draggedItem);

  console.log(draggedItemIndex);

  event.dataTransfer.effectAllowed = 'move';
 // event.dataTransfer.setData('text/html', draggedItem.innerHTML);
  event.target.style.opacity = '0.5';
}


function handleDragOver(event) {

  console.log('drag over!!!');

  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  // const targetItem = event.target;
  // if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
  //   const boundingRect = targetItem.getBoundingClientRect();
  //   const offset = boundingRect.y + (boundingRect.height / 2);
  //   if (event.clientY - offset > 0) {
  //     targetItem.style.borderBottom = 'solid 5px #000';
  //     targetItem.style.borderTop = '';
  //   } else {
  //     targetItem.style.borderTop = 'solid 5px #000';
  //     targetItem.style.borderBottom = '';
  //   }

  // }
  // else{
  //     targetItem.style.borderBottom = '';
  //     targetItem.style.borderTop = '';
  // }
}


function handleDrop(event) {
    console.log('handle drop');

    let dragList = document.getElementById('dragList');

    event.preventDefault();
    event.target.style.borderTop = '';
    event.target.style.borderBottom = '';

    const targetItem = event.target.closest('.drag-item');
    if (!targetItem || targetItem === draggedItem) {
      draggedItem.style.opacity = '';
      return;
    }

    let allChildren = Array.from(dragList.children);
    let children = [];

    allChildren.forEach((item, index) => {
      if(item.classList.contains('drag-item')) {
        children.push(item);
      }
    });

    let items = children.sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order));


    const targetIndex = items.indexOf(targetItem);


    const boundingRect = targetItem.getBoundingClientRect();
    const offset = boundingRect.y + (boundingRect.height / 2);
    
//    if (targetIndex > draggedItemIndex && (event.clientY - offset > 0)) {
        if (targetIndex > draggedItemIndex) {

        console.log('down');

     
        
        items.forEach((item, index) => {
            if(index <= targetIndex && index > draggedItemIndex){
                item.style.order = parseInt(item.style.order) - 1;
            }
        });

        draggedItem.style.order = targetIndex;
            

 //   } else if(targetIndex < draggedItemIndex && (event.clientY - offset < 0)) {
   } else if(targetIndex < draggedItemIndex) {


        console.log('up');

    

        items.forEach((item, index) => {
            if(index >= targetIndex && index < draggedItemIndex){
                item.style.order = parseInt(item.style.order) + 1;
              //  item.style.backgroundColor = 'white';
            }
        });

        draggedItem.style.order = targetIndex;

    }

    // if (targetIndex > draggedItemIndex) {
    //   items.forEach((item, index) => {
    //     if (index > draggedItemIndex && index <= targetIndex) {
    //       item.style.order = parseInt(item.style.order) - 1;
    //     }
    //   });
    // } else {
    //   items.forEach((item, index) => {
    //     if (index >= targetIndex && index < draggedItemIndex) {
    //       item.style.order = parseInt(item.style.order) + 1;
    //     }
    //   });
    // }

    //draggedItem.style.order = targetIndex;


    draggedItem.style.opacity = '';
     targetItem.style.borderTop = '';
   targetItem.style.borderBottom = '';
    draggedItem = null;


items.forEach((item, index) => {
      let body = item.querySelector('.body');
      body.innerHTML = item.style.order;
 });


//   event.preventDefault();
//   const targetItem = event.target;
//   if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
//     if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
//       targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
//     } else {
//       targetItem.parentNode.insertBefore(draggedItem, targetItem);
//     }
//   }
//   targetItem.style.borderTop = '';
//   targetItem.style.borderBottom = '';
//   draggedItem.style.opacity = '';
//   draggedItem = null;
}




document.addEventListener('DOMContentLoaded', () => {

    console.log('init');




     jsonData = [
      {
        roleId:1, 
        elements: [
          {symbol:'a',  split:false, isDeleted:false},
          {symbol:'b',  split:false, isDeleted:false},
          {symbol:'c',  split:false, isDeleted:false},
          {symbol:'d',  split:false, isDeleted:false},
          {symbol:'e',  split:false, isDeleted:false},
          {symbol:'f',  split:false, isDeleted:false},
          {symbol:'g',  split:false, isDeleted:false},
          {symbol:'h',  split:false, isDeleted:false},
          {symbol:'i',  split:false, isDeleted:false},
        ]},
        {
          roleId:2, 
          elements: [
          
            {symbol:'a',  split:true, isDeleted:false},
            {symbol:'c',  split:false, isDeleted:false},
            {symbol:'d',  split:false, isDeleted:false},
            {symbol:'e',  split:false, isDeleted:false},
            {symbol:'f',  split:false, isDeleted:false},
            {symbol:'g',  split:false, isDeleted:false},
            {symbol:'h',  split:false, isDeleted:false},
            {symbol:'i',  split:true, isDeleted:false},
            {symbol:'b',  split:false, isDeleted:true},
          ]},
          {
            roleId:3, 
            elements: [
              {symbol:'b',  split:false, isDeleted:false},
              {symbol:'a',  split:true, isDeleted:false},
              {symbol:'c',  split:false, isDeleted:false},
              {symbol:'d',  split:false, isDeleted:false},
              {symbol:'e',  split:false, isDeleted:false},
              {symbol:'f',  split:false, isDeleted:false},
              {symbol:'g',  split:false, isDeleted:false},
              {symbol:'i',  split:true, isDeleted:false},
              {symbol:'h',  split:true, isDeleted:false},
            ]}
    ];

    let roleList = document.getElementById("roleList");

    let defaultRoleId = roleList.value;




     let dragList = document.getElementById('dragList');

    // let allChildren = Array.from(dragList.children);
    // let items = [];

    // allChildren.forEach((item, index) => {
    //   if(item.classList.contains('drag-item')) {
    //     items.push(item);
    //   }
    // });


    let items = getAllItemsToDrag(dragList);



    console.log('roleList', roleList);




    reorder(defaultRoleId, items,jsonData);
    
    setDeletedItems(defaultRoleId, items,jsonData);


    



    items.forEach((item, index) => {
          let body = item.querySelector('.body');
          body.innerHTML = item.style.order;




     });




    // dragList.addEventListener('dragstart', handleDragStart);
    // dragList.addEventListener('dragover', handleDragOver);
    // dragList.addEventListener('drop', handleDrop);


  

});


function clearDeletedList(){

  const deletedList = document.getElementById('deletedList');


  const dragList = document.getElementById('dragList');


  let allChildren = Array.from(deletedList.children);

  allChildren.forEach((item, index) => {
    if(item.classList.contains('drag-item')) {
      
      dragList.appendChild(item);
    }
  });


}


function setDeletedItems(roleId, domElements, allDataElements){
  

  let elementsForSelectedRole = allDataElements.find(o => o.roleId == roleId);




  domElements.forEach((item, index) =>{


    let obj = elementsForSelectedRole.elements.find(o => o.symbol === item.getAttribute('data-symbol'));



    if(obj){

      if(obj.isDeleted){
        item.classList.add('deleted');
        item.classList.remove('active');

        deletedList.appendChild(item);
      
      }

      
    }
    

  });
}

function reorder(roleId, domElements, allDataElements){


    console.log('roleId', roleId);
    console.log('domElements', domElements);
    console.log('dataElements', allDataElements);


    let elementsForSelectedRole = allDataElements.find(o => o.roleId == roleId);

    domElements.forEach((item, index) =>{


      let obj = elementsForSelectedRole.elements.find(o => o.symbol === item.getAttribute('data-symbol'));

      if(obj){

       let order =  elementsForSelectedRole.elements.indexOf(obj);

        item.style.order = order;

        if(obj.split){
          item.classList.add('split-size');
          item.classList.remove('full-size');
        }
        else{
          item.classList.remove('split-size')
          item.classList.add('full-size')
        }
        
      }
      

    });



}
