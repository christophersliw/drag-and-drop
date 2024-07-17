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


window.handleRoleChange = (event) =>{
   const dragList = document.getElementById('dragList');

    clearDeletedList();

    let items = getAllItemsToDrag(dragList);
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

      let dataToSave = [];

      let allChildrenToSave = Array.from(dragList.children);
      let children = [];
    
      allChildrenToSave.forEach((item, index) => {
        if(item.classList.contains('drag-item')) {
          children.push(item);
        }
      });
    
      let sortedItems = children.sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order));

      sortedItems.forEach((item, index) => {
        let symbol = item.getAttribute('data-symbol');
        let split = item.classList.contains('split-size');
        dataToSave.push({symbol:symbol,split, isDeleted:false});
      });

      let allDeletedChildrenToSave = Array.from(dragList.children);
      let childrenDeleted = [];
    
      allDeletedChildrenToSave.forEach((item, index) => {
        if(item.classList.contains('drag-item')) {
          childrenDeleted.push(item);
        }
      });
    
      let sortedDeletedItems = childrenDeleted.sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order));

      sortedDeletedItems.forEach((item, index) => {
        let symbol = item.getAttribute('data-symbol');
        let split = item.classList.contains('split-size');
        dataToSave.push({symbol: symbol, split: split, isDeleted:true});
      });

      console.log('dataToSave:',dataToSave);

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

let jsonData = null;
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
}


function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}


function handleDrop(event) {
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
  
        if (targetIndex > draggedItemIndex) {

        console.log('down');

        items.forEach((item, index) => {
            if(index <= targetIndex && index > draggedItemIndex){
                item.style.order = parseInt(item.style.order) - 1;
            }
        });

        draggedItem.style.order = targetIndex;

   } else if(targetIndex < draggedItemIndex) {
        console.log('up');

        items.forEach((item, index) => {
            if(index >= targetIndex && index < draggedItemIndex){
                item.style.order = parseInt(item.style.order) + 1;
            }
        });

        draggedItem.style.order = targetIndex;

    }


    draggedItem.style.opacity = '';
     targetItem.style.borderTop = '';
   targetItem.style.borderBottom = '';
    draggedItem = null;


items.forEach((item, index) => {
      let body = item.querySelector('.body');
      body.innerHTML = item.style.order;
 });

}




document.addEventListener('DOMContentLoaded', () => {

    console.log('init');

     jsonData = [
      {
        roleId:1, 
        elements: [
          {symbol:'a',  split:false, isDeleted:false},
          {symbol:'b',  split:true, isDeleted:false},
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


    let items = getAllItemsToDrag(dragList);

    reorder(defaultRoleId, items,jsonData);
    
    setDeletedItems(defaultRoleId, items,jsonData);

    items.forEach((item, index) => {
          let body = item.querySelector('.body');
          body.innerHTML = item.style.order;
     });

});


function clearDeletedList(){

  const deletedList = document.getElementById('deletedList');

  const dragList = document.getElementById('dragList');

  let allChildren = Array.from(deletedList.children);

  allChildren.forEach((item, index) => {
    if(item.classList.contains('drag-item')) {
      
      item.classList.remove('deleted');
      item.classList.add('active');
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
