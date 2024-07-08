
import "./main.css";


window.handleBtnToggleSplit = (event) =>{
  event.target.closest('.drag-item').classList.toggle("split");
}


let jsonData = null;

window.handleRoleChange = (event) =>{
  // const dragList = document.getElementById('dragList');

  //   let allChildren = Array.from(dragList.children);
  //   let items = [];

  //   allChildren.forEach((item, index) => {
  //     if(item.classList.contains('drag-item')) {
  //       items.push(item);
  //     }
  //   });

    let items = getAllItemsToDrag();


    reorder(event.target.value, items,jsonData);

}


window.handleBtnToggleReorganize = (event) =>{
  const dragList = document.getElementById('dragList');

  dragList.classList.toggle("reorder");


  let items = getAllItemsToDrag();

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

    }
}

window.handleBtnCancelReorganize = (event) =>{
  const dragList = document.getElementById('dragList');

  dragList.classList.remove("reorder");

let items = getAllItemsToDrag();

  // let allChildren = Array.from(dragList.children);
  // let items = [];

  // allChildren.forEach((item, index) => {
  //   if(item.classList.contains('drag-item')) {
  //     items.push(item);
  //   }
  // });

  items.forEach((item, index) => {
      item.draggable  = false;
   });


      dragList.removeEventListener('dragstart', handleDragStart);
      dragList.removeEventListener('dragover', handleDragOver);
      dragList.removeEventListener('drop', handleDrop);

      reorder(document.getElementById("roleList").value, items,jsonData);

    
}

let draggedItem = null;
let draggedItemIndex = null;



function getAllItemsToDrag(){
  let dragList = document.getElementById('dragList');

  let allChildren = Array.from(dragList.children);
  let items = [];

  allChildren.forEach((item, index) => {
    if(item.classList.contains('drag-item')) {
      items.push(item);
    }
  });

  return items;

}

function handleDragStart(event) {

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
          {symbol:'a', order:0, split:false},
          {symbol:'b', order:1, split:false},
          {symbol:'c', order:2, split:false},
          {symbol:'d', order:3, split:false},
          {symbol:'e', order:4, split:false},
          {symbol:'f', order:5, split:false},
          {symbol:'g', order:6, split:false},
          {symbol:'h', order:7, split:false},
          {symbol:'i', order:8, split:false},
        ]},
        {
          roleId:2, 
          elements: [
            {symbol:'b', order:0, split:false},
            {symbol:'a', order:1, split:true},
            {symbol:'c', order:2, split:false},
            {symbol:'d', order:3, split:false},
            {symbol:'e', order:4, split:false},
            {symbol:'f', order:5, split:false},
            {symbol:'g', order:6, split:false},
            {symbol:'h', order:7, split:false},
            {symbol:'i', order:8, split:true},
          ]},
          {
            roleId:3, 
            elements: [
              {symbol:'b', order:0, split:false},
              {symbol:'a', order:1, split:true},
              {symbol:'c', order:2, split:false},
              {symbol:'d', order:3, split:false},
              {symbol:'e', order:4, split:false},
              {symbol:'f', order:5, split:false},
              {symbol:'g', order:6, split:false},
              {symbol:'i', order:7, split:true},
              {symbol:'h', order:8, split:true},
            ]}
    ];

    let roleList = document.getElementById("roleList");

    let defaultRoleId = roleList.value;




    // const dragList = document.getElementById('dragList');

    // let allChildren = Array.from(dragList.children);
    // let items = [];

    // allChildren.forEach((item, index) => {
    //   if(item.classList.contains('drag-item')) {
    //     items.push(item);
    //   }
    // });


    let items = getAllItemsToDrag();



    console.log('roleList', roleList);



    reorder(defaultRoleId, items,jsonData);





    items.forEach((item, index) => {
          let body = item.querySelector('.body');
          body.innerHTML = item.style.order;




     });




    // dragList.addEventListener('dragstart', handleDragStart);
    // dragList.addEventListener('dragover', handleDragOver);
    // dragList.addEventListener('drop', handleDrop);


  

});


function reorder(roleId, domElements, allDataElements){


    console.log('roleId', roleId);
    console.log('domElements', domElements);
    console.log('dataElements', allDataElements);


    let elementsForSelectedRole = allDataElements.find(o => o.roleId == roleId);

    domElements.forEach((item, index) =>{


      let obj = elementsForSelectedRole.elements.find(o => o.symbol === item.getAttribute('data-symbol'));

      if(obj){
        item.style.order = obj.order;

        if(obj.split){
          item.classList.add('split')
        }
        else{
          item.classList.remove('split')
        }
        
      }
      

    });



}
