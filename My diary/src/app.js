let local_data = [];
let rootNode = document.getElementById('root'); 
let mainInput = document.querySelector('.addAction');
let addButton = document.querySelector('.button');
let addIcon = document.querySelector('.addIcon');

let error_search = document.querySelector('.error_search');
let error_text = document.querySelector('.error_text');
let error_theme = document.querySelector('.error_theme');
let error_date = document.querySelector('.error_date');

let themeInput = document.getElementById('theme');
let hr = document.querySelector('.hr');
let search = document.getElementById('search');
let dateSearch = document.getElementById('dateSearch');

let exit = document.getElementById('exit');

themeInput.selectedIndex = -1; 

window.onload =  () => { 
    loadStorage(); // loading notes from Local Storage
    updateDOM(); // adding notes

    // if(!localStorage.name) { // пароль
    //    localStorage.name = prompt('Enter your name');
    //    localStorage.password = prompt('Create a password');
    //    passwordChecking ();
    // } else {
    //    passwordChecking ();
    // }
}

exit.addEventListener('click', () => { // exit ()
    localStorage.removeItem('name');
    localStorage.removeItem('password');
    window.location.reload();
})

search.addEventListener('click', () => { // search by theme
    let themeCheck = false;

    if(search.value === 'Search by theme') {
        if(themeInput.selectedIndex === -1) {
            search.value = 'Search by theme';
            error_theme.style.display = 'block';
        } else {
            error_theme.style.display = 'none';
            local_data.forEach((el) => {
                if (el.themeInput !== themeInput.value) {
                    el.search = 'none';
                }else{
                    themeCheck = true;
                }
        });

        if (themeCheck === false) {
            error_search.style.display = 'block';
        }

        search.value = 'Cancel';
        }
    } else if(search.value === 'Cancel'){
        error_search.style.display = 'none';
        local_data.forEach((el) => {
            el.search = 'flex';
        });
        search.value = 'Search by theme';
    }
    localStorage.setItem('data', JSON.stringify(local_data));
    updateDOM();
});

dateSearch.addEventListener('click', () => { // Search by date
    if(dateSearch.value === 'Search by date') {
        if(mainInput.value !== ''){
            local_data.forEach((el) => {
                if(el.date !== mainInput.value) {
                    el.search = 'none';
                }
            });
            dateSearch.value = 'Cancel';
            error_date.style.display = 'none';
        }else {
            error_date.style.display = 'block';
            dateSearch.value = 'Search by date';
        }
    } else if(dateSearch.value == 'Cancel') {
        local_data.forEach((el) => {
            el.search = 'flex';
        });
        dateSearch.value = 'Search by date';
    }

    localStorage.setItem('data', JSON.stringify(local_data));
    updateDOM();
});

function loadStorage() { 
    let data = localStorage.getItem('data');
    if (data) {
        local_data = JSON.parse(data);
    }
}

inputCheck();

function updateDOM() {
    if (local_data.length) {
        newNoteCreator();
    } else {
        while (rootNode.lastChild) {
            rootNode.removeChild(rootNode.lastChild);
        }
    }
}
mainInput.addEventListener('input', inputCheck);

function inputCheck () { 
    if(!mainInput.value){
        addIcon.style.color = '#c8d0d8';
    }else{
        error_text.style.display = 'none';
        addIcon.style.color = '#41b5fe';
    }
};

function passwordChecking () { 
    let passwordCheck = prompt('Введіть пароль');
    if(passwordCheck === localStorage.password) {
        alert('Привіт ' + localStorage.name);
    } else {
        alert('Ви ввели неправильний пароль!');
        window.location.reload();
    }
}

addButton.addEventListener('click', addData); 

function addData(event) {
    if(!mainInput.value) {
        error_text.style.display = 'block';  
        event.preventDefault();                          
    } 
    else if(themeInput.selectedIndex === -1) {  
        error_theme.style.display = 'block';
        event.preventDefault(); 
    }else {
        let obj = {}; 
        error_theme.style.display = 'none';

        obj.value = mainInput.value;
        obj.themeInput = themeInput.value;

        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        obj.time = d.toLocaleTimeString();
        obj.date = day + '.' + month + '.' + year;

        obj.search = 'flex';

        local_data.push(obj);
        localStorage.setItem('data', JSON.stringify(local_data));

        updateDOM();
    }
}

function newNoteCreator() {
    while (rootNode.lastChild) {
        rootNode.removeChild(rootNode.lastChild);
    }
    if (local_data.length !== 0) {
        local_data.forEach(el => {
            let itemContainer = document.createElement('div'); 
            itemContainer.setAttribute('draggable', 'true');
            itemContainer.style.display = el.search;

            let newItem = document.createElement('input');
            newItem.setAttribute('type', 'text');
            newItem.value = el.value;
            newItem.style.display = 'none';

            let theme = document.createElement('p'); 
            theme.textContent = el.themeInput;
            theme.className = 'theme';

            let dateContainer = document.createElement('div'); 
            dateContainer.className = 'dateContainer';                                                                                                                                                          
            let currentDate = document.createElement('p'); 
            let currentTime = document.createElement('p');
            currentDate.className = 'currentDate';
            currentDate.textContent = el.date;
            currentTime.textContent =  el.time;

            let checkBox = document.createElement('i');
            checkBox.className = 'material-icons added_ico_checkbox';
            checkBox.textContent = 'check_box_outline_blank';
            checkBox.addEventListener('click', unclick)

            checkBox.addEventListener('click', () => {
                checkBox.textContent = 'check_box';
            });

            let labelForItem = document.createElement('div');
            labelForItem.textContent = newItem.value;
            labelForItem.className = 'itemsLabel';

            let editIcon = document.createElement('i');
            editIcon.className = 'material-icons';
            editIcon.textContent = 'create';
            editIcon.addEventListener('click', () => {
                itemContainer.removeAttribute('draggable');
                
                checkBox.style.display = 'none';
                newItem.style.display = 'inline-block';
                labelForItem.style.display = 'none';
                editIcon.style.display = 'none';
                removeIcon.style.display = 'none';
                saveChangesIcon.style.display = 'inline-block';
            });

            let removeIcon = document.createElement('i');
            removeIcon.className = 'material-icons removeIcn';
            removeIcon.textContent = 'delete';
            removeIcon.addEventListener('click', removeItem)

            let saveChangesIcon = document.createElement('i');
            saveChangesIcon.className = 'material-icons';
            saveChangesIcon.textContent = 'save';
            saveChangesIcon.style.display = 'none';

            saveChangesIcon.addEventListener('click', (e) => {     
                let text = e.target.parentNode.children[2].textContent;
                for (let i = 0; i < local_data.length; i++) {
                    if (local_data[i].value === text) {
                        local_data[i].value = newItem.value;
                    }
                }
                localStorage.setItem('data', JSON.stringify(local_data));
                updateDOM();   

                labelForItem.textContent = newItem.value;
            
                checkBox.style.display = 'inline-block';
                newItem.style.display = 'none';
                labelForItem.style.display = 'inline-block';
                editIcon.style.display = 'inline-block';
                removeIcon.style.display = 'inline-block';
                saveChangesIcon.style.display = 'none';
            
                itemContainer.setAttribute('draggable', 'true');                
            });

            itemContainer.appendChild(dateContainer);
            dateContainer.appendChild(theme);
            dateContainer.appendChild(currentDate);
            dateContainer.appendChild(currentTime);
            itemContainer.appendChild(newItem);              
            itemContainer.appendChild(labelForItem);
            itemContainer.appendChild(editIcon);
            itemContainer.appendChild(saveChangesIcon);
            itemContainer.appendChild(removeIcon);
            rootNode.appendChild(itemContainer);
            
            let newSelect = document.querySelector('.new-select');

            newSelect.textContent = 'Тема';
            themeInput.selectedIndex = -1;
        });
        mainInput.value = '';
        themeInput.value = '';
        addIcon.style.color = '#c8d0d8';
    }
}

function unclick () {
    this.disabled = true;
}

function removeItem(e) {
    let text = e.target.parentNode.children[2].textContent;
    for (let i = 0; i < local_data.length; i++) {
        if (local_data[i].value === text) {
            local_data.splice(i, 1);
            i--;
        }
    }
    localStorage.setItem('data', JSON.stringify(local_data));

    updateDOM();
}


let dragging = null;

rootNode.addEventListener('dragstart', function(event) {
		dragging = event.target;
    event.dataTransfer.setData('text/html', dragging);
});

rootNode.addEventListener('dragover', function(event) {
    event.preventDefault();
});

rootNode.addEventListener('dragenter', function(event) {
    if(event.target.tagName === 'DIV'){
        event.target.style['border-bottom'] = 'solid 3px #41b5fe';
    }
});

rootNode.addEventListener('dragleave', function(event) {
    if(event.target.tagName === 'DIV'){
        event.target.style['border-bottom'] = '';
    }
});

rootNode.addEventListener('drop', function(event) {
    event.preventDefault();
    if(event.target.tagName === 'DIV'){
        event.target.style['border-bottom'] = '';
        event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
    }
});

$('.select').each(function() {
    let _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 600; 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        document.getElementById('hr').style.marginTop = '140px';
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                document.getElementById('hr').style.marginTop = '10px';
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                duration = 200;
                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            document.getElementById('hr').style.marginTop = '10px';
            $(this).removeClass('on');
            duration = 200;
            selectList.slideUp(duration);
        }
    });
});

