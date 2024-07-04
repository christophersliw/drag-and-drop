import "./main.css";


document.addEventListener('DOMContentLoaded', () => {

    console.log('init');
    const dragList = document.getElementById('dragList');

    let items = Array.from(dragList.children);
    items.forEach((item, index) => {
            item.innerHTML =  item.style.order;

            });



     let draggedItem = null;
     let draggedItemIndex = null;
     

        // Add event listeners for drag and drop events
        dragList.addEventListener('dragstart', handleDragStart);
         dragList.addEventListener('dragover', handleDragOver);
         dragList.addEventListener('drop', handleDrop);

          // Drag start event handler
    function handleDragStart(event) {

        console.log('drag start');

      draggedItem = event.target;

      draggedItemIndex = Array.from(dragList.children).sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order)).indexOf(draggedItem);

      console.log(draggedItemIndex);

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', draggedItem.innerHTML);
      event.target.style.opacity = '0.5';
    }

      // Drag over event handler
      function handleDragOver(event) {

console.log('drag over!!!');

      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      const targetItem = event.target;
      if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
        const boundingRect = targetItem.getBoundingClientRect();
        const offset = boundingRect.y + (boundingRect.height / 2);
        if (event.clientY - offset > 0) {
          targetItem.style.borderBottom = 'solid 5px #000';
          targetItem.style.borderTop = '';
        } else {
          targetItem.style.borderTop = 'solid 5px #000';
          targetItem.style.borderBottom = '';
        }

//console.log('event.clientY', event.clientY);
//console.log('offset', offset);

      }
      else{
      //    console.log('not dragged item', targetItem);
          targetItem.style.borderBottom = '';
          targetItem.style.borderTop = '';
      }
    }

    // Drop event handler
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

        const targetIndex = Array.from(dragList.children).sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order)).indexOf(targetItem);
        const items = Array.from(dragList.children).sort((a, b) => parseInt(a.style.order) - parseInt(b.style.order));


        items.forEach((item, index) => {
                
             //      console.log(item.style.order);
                
            });

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
            item.innerHTML = item.style.order;

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

});
