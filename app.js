// select Elements
const addInputElement = document.querySelector("#addInput");
const addButtonElement = document.querySelector("#addButton");
const ulElement = document.querySelector("#ulElement");
const checkedInput = document.querySelector("#checked");
const unCheckedInput = document.querySelector("#unchecked");

//addEventListener Section
addButtonElement.addEventListener(("click"), addItemstoUlElement);
document.addEventListener(("keyup"), (e) => {if(e.key === "Enter") addItemstoUlElement()});

document.addEventListener("DOMContentLoaded", () => {
    fetchGetApi();
})
function addItemstoUlElement(data){
        const newDiv = document.createElement("div");
        newDiv.className = "newDiv";
        //Create new Items
        const checkTypeInput = document.createElement("input");
        checkTypeInput.type = "checkbox";
        checkTypeInput.className = "checkbox";

        const newLiInput = document.createElement("input");
        newLiInput.type = "text";
        newLiInput.className = "newLis";
        newLiInput.disabled=true;
        addInputElement.value.trim() === "" ? newLiInput.value = data.title : newLiInput.value = addInputElement.value;

        const newButton = document.createElement("button");
        newButton.innerText = "Delete";
        newButton.className = "newButton";
        newButton.id = data.id;

        const newEditButton = document.createElement("button");
        newEditButton.innerText="Edit";
        newEditButton.classList = "newEditButton";

        const newSaveButton = document.createElement("button");
        newSaveButton.innerText = "Save";
        newSaveButton.className = "newEditButton";
        newSaveButton.id = data.id;

        //add elements
        ulElement.append(newDiv)
        newDiv.append(checkTypeInput);
        newDiv.append(newLiInput);
        newDiv.append(newEditButton);
        newDiv.append(newSaveButton);
        newDiv.append(newButton);
        addInputElement.value = "";

        //deleteButton,EditButton,SaveButton - addeventListener
        newButton.addEventListener(("click"), (e) => {
            ulElement.removeChild(newDiv); 
            let id = e.target.id;
            fetchDeleteApi(id);
        });
        newEditButton.addEventListener(("click"),() => {newLiInput.disabled=false;})
        newSaveButton.addEventListener(("click"),(e) => {
            newLiInput.disabled=true;
            let id = e.target.id;
            console.log(id)
            let title = e.target.innerText;
            fetchPutRequest(id,title);
        })

        //Done - if checkbox selected
        const allCheckboxes = document.querySelectorAll(".checkbox");
        allCheckboxes.forEach((allCheckbox) => {
            allCheckbox.addEventListener(("click"), () => {
                if(allCheckbox.checked){
                    allCheckbox.nextElementSibling.style.color = "green";
                    allCheckbox.nextElementSibling.style.textDecoration  = "line-through";
                    allCheckbox.nextElementSibling.nextElementSibling.disabled = true;
                    allCheckbox.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true;
                    allCheckbox.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true;
                }
                else{
                    allCheckbox.nextElementSibling.style.color = "gray";
                    allCheckbox.nextElementSibling.style.textDecoration  = "none";
                    allCheckbox.nextElementSibling.nextElementSibling.disabled = false;
                    allCheckbox.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false;
                    allCheckbox.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false;
                }
            })
        })
        
        //Checked all Items
        checkedInput.addEventListener(("click"), () => {
                const divElements = document.querySelectorAll(".newDiv");
                if(checkedInput.checked){
                    divElements.forEach((divElement) => {
                        if(!divElement.firstChild.checked){
                            divElement.style.display = 'none';
                        }
                    })
                }
                else{
                    divElements.forEach((divElement) => {
                        if(!divElement.firstChild.checked){
                            divElement.style.display = 'flex';
                        }
                    })
                }
            })

            unCheckedInput.addEventListener(("click"), () => {
                const divElements = document.querySelectorAll(".newDiv");
                if(unCheckedInput.checked){
                    divElements.forEach((divElement) => {
                        if(divElement.firstChild.checked){
                            divElement.style.display = 'none';
                        }
                    })
                }
                else{
                    divElements.forEach((divElement) => {
                        if(divElement.firstChild.checked){
                            divElement.style.display = 'flex';
                        }
                    })
                }
            })

}

//Get Request
const fetchGetApi = async () => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    try {
        const response = await fetch(url);
        const data = await response.json();
        const sevenData = data.splice(0,7);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        else{
            sevenData.map((data) => {
                addItemstoUlElement(data);
            })
        }
    } 
    catch (error) {
        console.log(error);
    }
}



const fetchDeleteApi = async (id) => {
    fetch('https://jsonplaceholder.typicode.com/todos/'+ id, {
        method: 'DELETE',
    });
}


const fetchPutRequest = async (_id,_title) => {
    await fetch('https://jsonplaceholder.typicode.com/todos/' +  _id, {
    method: 'PUT',
    body: JSON.stringify({
        title: _title
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

}
























