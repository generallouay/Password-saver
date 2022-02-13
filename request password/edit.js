"use strict";

const editPageContent = document.getElementById('edit-page-content');
const editPageInp = document.getElementById('edit-platform');

for (const [key , val] of Object.entries(objToLoop)){
    if (val[0]){
        const item = document.createElement('div');
        const txt = document.createTextNode(`${key}`);
        item.appendChild(txt)
        item.classList.add('edit-page-item')
        editPageContent.appendChild(item)
        item.addEventListener('click' , function(){
            overlay.classList.add('active-overlay')
            const bord = document.createElement('div');
            const confirmDiv = document.createElement('div');
            confirmDiv.classList.add('edit-page-confirm-div')
            for(let idx = 0 ; idx < val.length; idx ++){
                const element = val[idx];
                const accWindow = document.createElement('div');
                const userName = document.createElement('div');
                const email = document.createElement('div');
                const password = document.createElement('div');

                userName.classList.add('req-page-user-div')
                email.classList.add('req-page-email-div')
                password.classList.add('req-page-password-div');
                accWindow.classList.add('edit-page-acc-window');

                if (element.username.length > 0){
                    accWindow.appendChild(userName);
                    userName.innerHTML = `
                <div class="req-page-lable">username</div><div class="edit-page-expose"><input spellcheck="false" value="${element.username}"></input></div>
                `;
                }

                if (element.email.length > 0){
                    accWindow.appendChild(email);
                    email.innerHTML = `
                <div class="req-page-lable">email</div><div class="edit-page-expose"><input spellcheck="false" value="${element.email}"></input></div>
                `;
                }

                if (accWindow.children.length < 2){
                    accWindow.style.minHeight = '90px'
            
                }else if (accWindow.children.length === 2){
                    accWindow.style.minHeight = '130px'
                }


                password.innerHTML = `
                <div class="req-page-lable">password</div><div class="edit-page-expose"><input spellcheck="false" value="${element.password}"></input></div>
                `;
            
                accWindow.appendChild(password); 
                bord.appendChild(accWindow);
            }
            confirmDiv.innerHTML = `<button>Confirm</button>`
            bord.appendChild(confirmDiv)

            overlay.appendChild(bord)
            setTimeout(() => {
                bord.classList.add('bord-class')
            }, 1);

            confirmDiv.firstChild.addEventListener('click' , (e)=>{

                const array = e.target.parentElement.parentElement.children;
                const obj = getMainObject();
                const edited = [];

                  
                // values after editing
                for (let idx = 0 ; idx< array.length; idx++){
                    const element = array[idx];
                    if (element.className !== 'edit-page-confirm-div'){
                        const collect = {};
                        for(let idx2 = 0 ; idx2 < element.children.length ; idx2++){
                            const type = element.children[idx2].firstElementChild.innerText;
                            const val = element.children[idx2].lastElementChild.firstChild.value;
                            collect[type] = val;             
                        }
                        if(!collect['username']){
                            collect['username'] = '';
                        }else if(!collect['email']){
                            collect['email'] = '';
                        }
                        edited.push(collect);
                    }
                }

                obj[txt.textContent] = edited;
                localStorage.setItem('savePasswordProject' , JSON.stringify(obj))
                bord.classList.add('inActive');
                setTimeout(() => {
                    overlay.classList.add('inActive')
                }, 100);
                setTimeout(() => {
                    document.location.reload();
                }, 500);
            })
            

        })
    }
  
}

editPageInp.addEventListener('keyup' , function(){
    const arr = editPageContent.children;
    const editPageInpValue = document.getElementById('edit-platform').value.toLowerCase().trim();
    
    for (let idx = 0 ; idx< arr.length ; idx ++){
        const element = arr[idx];
        if (editPageInpValue){
            if (element.textContent.indexOf(editPageInpValue)){
                element.classList.add('disable')
            }else {
                element.classList.remove('disable')
            }
        }else{
            element.classList.remove('disable')
        }
    }
    const allInvisble = [];
    for ( let j = 0 ; j<arr.length ; j++){
        const element = arr[j];
        if (element.classList.contains('disable')){
            allInvisble.push(element);
        }
    };
    if (allInvisble.length === arr.length){
        const errMsg = document.createElement('h1');
        errMsg.textContent = `Oops! Looks like there's nothing to display`;
        editPageContent.appendChild(errMsg)
    }else{
        for (let idx = 0 ; idx< arr.length ; idx ++){
            const element = arr[idx];
            if(element.nodeName === "H1"){
                element.remove();
            }
        }
    }

})

