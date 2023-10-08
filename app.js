// select Elements
const addInputElement = document.querySelector("#addInput");
const addButtonElement = document.querySelector("#addButton");
const ulElement = document.querySelector("#ulElement");
const checkedInput = document.querySelector("#checked");
const unCheckedInput = document.querySelector("#unchecked");

//addEventListener Section
addButtonElement.addEventListener(("click"), addItemstoUlElement);
document.addEventListener(("keyup"), (e) => {if(e.key === "Enter") addItemstoUlElement()});

function addItemstoUlElement(){
    if( addInputElement.value.trim() === ""){
        alert("Please enter something!");
    }
    else{
        //Create new Items
        const newDiv = document.createElement("div");
        newDiv.className = "newDiv"

        const checkTypeInput = document.createElement("input");
        checkTypeInput.type = "checkbox";
        checkTypeInput.className = "checkbox";

        const newLiInput = document.createElement("input");
        newLiInput.type = "text";
        newLiInput.className = "newLis";
        newLiInput.disabled=true;
        newLiInput.value = addInputElement.value;

        const newButton = document.createElement("button");
        newButton.innerText = "Delete";
        newButton.className = "newButton";

        const newEditButton = document.createElement("button");
        newEditButton.innerText="Edit";
        newEditButton.classList = "newEditButton";

        const newSaveButton = document.createElement("button");
        newSaveButton.innerText = "Save";
        newSaveButton.className = "newEditButton";

        //add elements
        ulElement.append(newDiv)
        newDiv.append(checkTypeInput);
        newDiv.append(newLiInput);
        newDiv.append(newEditButton);
        newDiv.append(newSaveButton);
        newDiv.append(newButton);
        addInputElement.value = "";

        //deleteButton,EditButton,SaveButton - addeventListener
        newButton.addEventListener(("click"), () => {ulElement.removeChild(newDiv) });
        newEditButton.addEventListener(("click"),() => {newLiInput.disabled=false;})
        newSaveButton.addEventListener(("click"),() => {newLiInput.disabled=true;})

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
}
























