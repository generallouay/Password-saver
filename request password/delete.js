"use strict";

const deletePageContent = document.getElementById('delete-page-content');
const deletePageInp = document.getElementById('delete-platform');
for (const [key , val] of Object.entries(objToLoop)){
    if (val[0]){
        const item = document.createElement('div');
        const txt = document.createTextNode(`${key}`);
        item.appendChild(txt)
        item.classList.add('edit-page-item')
        deletePageContent.appendChild(item)
        item.addEventListener('click' , function(){
            overlay.classList.add('active-overlay')
            const bord = document.createElement('div');

            for(let idx = 0 ; idx < val.length; idx ++){
                const element = val[idx];
                const accWindow = document.createElement('div');
                const userName = document.createElement('div');
                const email = document.createElement('div');
                const password = document.createElement('div');
                const deleteAccountBtn = document.createElement('i');
               
                deleteAccountBtn.className = 'fas fa-trash-alt trs-btn-to-del-acc';
                userName.classList.add('req-page-user-div')
                email.classList.add('req-page-email-div')
                password.classList.add('req-page-password-div');
                accWindow.classList.add('delete-page-acc-window');

                if (element.username.length > 0){
                    accWindow.appendChild(userName);
                    userName.innerHTML = `
                <div class="req-page-lable">username</div><div class="req-page-expose">${element.username}</div>
                `;
                }

                if (element.email.length > 0){
                    accWindow.appendChild(email);
                    email.innerHTML = `
                <div class="req-page-lable">email</div><div class="req-page-expose">${element.email}</div>
                `;
                }

                if (accWindow.children.length < 2){
                    accWindow.style.minHeight = '90px'

                    deleteAccountBtn.style.top = '34px';
                    deleteAccountBtn.style.right = '35px';

            
                }else if (accWindow.children.length === 2){
                    accWindow.style.minHeight = '130px'

                    deleteAccountBtn.style.top = '50px';
                    deleteAccountBtn.style.right = '35px';

                }


                password.innerHTML = `
                <div class="req-page-lable">password</div><div class="req-page-expose">${element.password}</div>
                `;
            
                accWindow.appendChild(password);
                accWindow.appendChild(deleteAccountBtn)
                bord.appendChild(accWindow);
                deleteAccountBtn.addEventListener('click' , p => {
                    const array = objToLoop[txt.textContent];
                    let toDeleteItem;
                    for (let idx = 0 ; idx< array.length ; idx++){
                        const element = array[idx];
                        if (element.username.length === 0){
                            if (p.target.parentElement.textContent.includes(element.email)){
                                toDeleteItem = element;
                                break;
                            }
                        }else if (element.email.length === 0){
                            if (p.target.parentElement.textContent.includes(element.username)){
                                toDeleteItem = element;
                                break;
                            }
                        }else if (element.email.length > 0 && element.username.length > 0){
                            if (p.target.parentElement.textContent.includes(element.email)&&p.target.parentElement.textContent.includes(element.username)){
                                toDeleteItem = element;
                                break;
                            }

                        }



                    }
                    for (let idx = 0 ; idx < array.length; idx++){
                        const element = array[idx];
                        if (element.username.length < 1){
                            if (element.email === toDeleteItem.email){
                                array.splice(array.indexOf(element) , 1);
                                break;
                       
                            }
                        }else if (element.email.length < 1 ){
                            if (element.username === toDeleteItem.username){
                                array.splice(array.indexOf(element) , 1);
                                break;
                                
                            }
                        }else if (element.email.length > 0 && element.username.length > 0){
                            if (element.username === toDeleteItem.username || element.email === toDeleteItem.email){
                                array.splice(array.indexOf(element) , 1);
                                break;
                                
                            }
                        }

                    }
                    localStorage.setItem('savePasswordProject' , JSON.stringify(objToLoop));

                    p.target.parentElement.classList.add('inActive')
                    setTimeout(() => {
                        p.target.parentElement.remove();
                    }, 300);
                })
            }

            overlay.appendChild(bord)
            setTimeout(() => {
                bord.classList.add('bord-class')
            }, 1);

        })
    }
  
}

deletePageInp.addEventListener('keyup' , function(){
    const arr = deletePageContent.children;
    const deletePageInpValue = document.getElementById('delete-platform').value.toLowerCase().trim();
    
    for (let idx = 0 ; idx< arr.length ; idx ++){
        const element = arr[idx];
        if (deletePageInpValue){
            if (element.textContent.indexOf(deletePageInpValue)){
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
        deletePageContent.appendChild(errMsg)
    }else{
        for (let idx = 0 ; idx< arr.length ; idx ++){
            const element = arr[idx];
            if(element.nodeName === "H1"){
                element.remove();
            }
        }
    }

})

function getMainObject(){
   
    for(let idx = 0 ; idx < localStorage.length ; idx++){
      const key = localStorage.key(idx);
      if (key.toString() === 'savePasswordProject'){
        return JSON.parse(localStorage.getItem(key))
      }               
    }

    return {
        twitter : [],
        facebook : [],
        google : [],
        instagram : [],
        twitch : [],
        reddit : [],
        tiktok : [],
        snapchat : [],
        spotify : [],
        discord : [],

    }

}
