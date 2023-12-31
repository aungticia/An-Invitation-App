document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');
  
  filterLabel.textContent = "Hide those who haven't responded!";
  filterCheckbox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);
  
  filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if(li.className === 'responded') {
          li.style.display = '';
      } else {
        li.style.display = 'none';
      }
     }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });
  
  function createLI(text) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
    
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    li.appendChild(editButton);
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    li.appendChild(removeButton);
    return li;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== "") {   
      const text = input.value;
      input.value = '';
      const li = createLI(text);
      ul.appendChild(li);
    }
  });
  
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
  
  // Remove Button Event
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      
      if (button.textContent === 'Remove') {
        ul.removeChild(li);
      } else if (button.textContent === 'Edit') {
        // Edit Button
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        // Save Button
        button.textContent = 'Save';
      } else if (button.textContent === 'Save') {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'Edit';
      }
    }
  });
});