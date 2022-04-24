'use strict'

const objToLoop = getMainObject();
const reqPageContent = document.getElementById('req-page-content');
const reqPageInp = document.getElementById('req-platform');
const overlay = document.querySelector('.overlay');

for (const [key , val] of Object.entries(objToLoop)){
    if (val[0]){
        const item = document.createElement('div');
        const txt = document.createTextNode(`${key}`);
        item.appendChild(txt)
        item.classList.add('req-page-item')
        reqPageContent.appendChild(item)
        item.addEventListener('click' , function(){
            overlay.classList.add('active-overlay')
            const bord = document.createElement('div');
            for(let idx = 0 ; idx < val.length; idx ++){
                const element = val[idx];
                const accWindow = document.createElement('div');
                const userName = document.createElement('div');
                const email = document.createElement('div');
                const password = document.createElement('div');
   
                userName.classList.add('req-page-user-div')
                email.classList.add('req-page-email-div')
                password.classList.add('req-page-password-div');

                if (element.username.length > 0){
                    accWindow.appendChild(userName);
                    userName.innerHTML = `
                <div class="req-page-lable">username</div><div class="req-page-expose">${element.username}</div><div class="copy-btn"><button>Copy</button></div>
                `;
                }

                if (element.email.length > 0){
                    accWindow.appendChild(email);
                    email.innerHTML = `
                <div class="req-page-lable">email</div><div class="req-page-expose">${element.email}</div><div class="copy-btn"><button>Copy</button></div>
                `;
                }

                password.innerHTML = `
                <div class="req-page-lable">password</div><div class="req-page-expose">${element.password}</div><div class="copy-btn"><button>Copy</button></div>
                `;

                if (accWindow.children.length < 2){
                    accWindow.style.minHeight = '90px'
            
                }else if (accWindow.children.length === 2){
                    accWindow.style.minHeight = '130px'
                }
 
                accWindow.appendChild(password); 
                accWindow.classList.add('req-page-acc-window');

                bord.appendChild(accWindow);
            }


            overlay.appendChild(bord)
            setTimeout(() => {
                bord.classList.add('bord-class')
            }, 1);

            const copyBtns = document.querySelectorAll('.copy-btn');
            for (let j = 0 ; j < copyBtns.length ; j ++){
                const elem = copyBtns[j];
                elem.addEventListener('click' , function(){
                    if (elem.previousElementSibling.innerText){
                        navigator.clipboard.writeText(elem.previousElementSibling.innerText)
                    }

                } )
            }
        })
    }
}


reqPageInp.addEventListener('keyup' , function(){
  
    const array = reqPageContent.children;
    const reqPageInpValue = document.getElementById('req-platform').value.toLowerCase().trim();
    for (let idx = 0 ; idx < array.length ; idx++){
        const element = array[idx];
        if (reqPageInpValue){
            if (element.textContent.indexOf(reqPageInpValue)){
                element.style.display = 'none'
            }else {
                element.style.display = 'flex'
            }
        }else{
            element.style.display = 'none'
        }
    }
    if (!reqPageContent.innerText){
        const errMsg = document.createElement('h1');
        errMsg.textContent = `Oops! Looks like there's nothing to display`;
        reqPageContent.appendChild(errMsg)
    }
    

})


overlay.addEventListener('click' , function(param){
    if (param.target.classList.contains('overlay')){
        overlay.classList.remove('active-overlay')
        overlay.innerHTML = ``;
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
