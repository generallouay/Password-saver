"use strict";


const requestBtn = document.getElementById("request");
const saveBtn = document.getElementById("save");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const allBtns = document.getElementsByTagName("section");
const body = document.body;
const requestPage = document.querySelector('.requestDiv');
const savePage = document.querySelector('.saveDiv');
const editPage = document.querySelector('.editDiv');
const deletePage = document.querySelector('.deleteDiv');
const saveForm = document.querySelector('.save-form');
const saveFormContent = document.getElementById('save-form-content');
const saveFormBtnsDiv = document.getElementById('save-form-btns-div');
const checkBtn = document.getElementById('save-btn-an');



const showRequestPage = () => {
  setMainObj()
  disableBtns();
  setTimeout(() => {
    requestPage.classList.add('active')
  }, 500);
  

};

const showSavePage = () => {
  setMainObj()
  disableBtns();
  setTimeout(() => {
    savePage.classList.add('active')
  }, 500);
  
};

const showEditPage = () => {
  setMainObj()
  disableBtns();
  setTimeout(() => {
    editPage.classList.add('active')
  }, 500);

};

const showDeletePage = () => {
  setMainObj();
  disableBtns();
  setTimeout(() => {
    deletePage.classList.add('active')
  }, 500);

};

// this function is disabling the main page and i used it in each of the functions above;
const disableBtns = () => {
  return new Promise((reslove, reject) => {
    for (let idx = 0; idx < allBtns.length; idx++) {
      const element = allBtns[idx];
      element.classList.add("inActive");
    }
    reslove();
  }).then(
    setTimeout(function () {
      for (let idx = 0; idx < allBtns.length; idx++) {
        const element = allBtns[idx];
        element.classList.add("disable");
      }
    }, 300)
  );
};

// this will be undefind when i run the code but when i click on some social btn it'll be it
let chosenSocialMedia;

// this function is disabling save page (social media buttons) 
// but it's not displaying the save form cuz the social media buttons do;
// i gave them events in the functoin called add events
const disableSavePage = (param) =>{
  return new Promise((resolve , reject) => {
    savePage.classList.remove('active')
    savePage.classList.add('inActive');
    chosenSocialMedia = param
    resolve()
  }).then(setTimeout(() => {
    savePage.classList.add('disable')
  }, 300))

}


// everytime i run this function it should create a new window to add new account
// it also triggers the check button verification
const addExtraAcc = () => {
  const elem = document.createElement('div');
  elem.innerHTML = ` 
  
  <div class="save-form-content-second-div to-loop">
  <i class="fas fa-times"></i>
      <div class="username-div">
          <label for="username">username</label>
          <input type="text" name="username" id="username" >
      </div>
      <div class="email-div">
          <label for="email">email</label>
          <input type="email" name="email" id="email">
      </div>
      <div class="password-div">
          <label for="password">password</label>
          <input type="password" name="password" id="password">
      </div>
  </div>`
  document.querySelector('.fix-dom-double-id-problem').appendChild(elem)
  setTimeout(() => {
    elem.classList.add('toBeDeleted')

    // running this function will disable the check button cuz we have an empty extra account window
    verifySaveForm()
  }, 1);
}


// this function will collect all the accounts inserted in the save form
// it'll also create an object for each account and push all the object to an array
// eventually when i run it it returns the array with all the accounts so I cant loop it and add it's content to the local sotrage.
function collectAccounts(){
  const accountsToSave = document.querySelectorAll('.to-loop')
  const usernameElements = [];
  const emailElements = [];
  const passwordElements = [];
  const toBeAdded = [];
  // loop all the inputs in the save form and separate the usernames / emails / passwords and push each to a different array
  for (let idx = 0 ; idx < accountsToSave.length; idx++){
    const element = accountsToSave[idx];
    const usernameInput = element.firstElementChild.nextElementSibling.lastElementChild;
    const emailInput = element.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
    const passwordInput = element.lastElementChild.lastElementChild;
    usernameElements.push(usernameInput)
    emailElements.push(emailInput);
    passwordElements.push(passwordInput)
    element.style.background = '#535252'
  }
  // loop all the 3 arrays together and making an object for each account
  for (let idx = 0; idx < usernameElements.length; idx++){
      const element = usernameElements[idx];

    for(let idx2 = 0 ; idx2 < emailElements.length; idx2++){
      const element1 = emailElements[idx];

      for(let idx3 = 0 ; idx3< passwordElements.length; idx3++){
        const element2 = passwordElements[idx];
        let account = {};
        account['username'] = element.value;
        account['email'] = element1.value;
        account['password'] = element2.value;
        toBeAdded.push(account);
        
        break;
      }
      break;
    }
  }
  return toBeAdded;

}

// this function will fetch the main object and add the collected accounts to one of the keys
// in the main object based on the social media button selected which is gonna be an array;
const verifyIfFilledInformations = () => {
  let obj = getMainObject();
  let arr = collectAccounts();
  let err = false;
  const header = document.getElementById('save-from-header');

  //reseting the form in case someone have filled invalid information like already an existing account
  if (chosenSocialMedia === 'sumElseBtn'){
    if (header.lastChild.className === `error-msg-save-form`){
      header.lastChild.remove();
      header.style.height = `130px`
    }
  }else{
    header.style.height = `100px`
    header.innerHTML = `<h1>Please enter your information</h1>`
  }
 
  // this loop will loop the array that contain all the collected accounts from the form;
  // the array that we returned from collect accounts function
  mainLoop :
  for(let idx = 0; idx< arr.length; idx++ ){
    let element = arr[idx];
    // if you clicked on something else cuz your platform isn't existing between the social media buttons
    if (chosenSocialMedia === 'sumElseBtn'){
      const platfromInpValue = document.getElementById('platform').value.toLowerCase().trim();
        // if the entered platform does not exist in the main object as a key create a new one and push the first account from the array to it
        if (!obj[platfromInpValue]){
          obj[platfromInpValue] = [];
          obj[platfromInpValue].push(element)
        }else{ // else which mean it does exist and there's no possibility that it's empty
        if (obj[platfromInpValue].length){ // if it has items or accounts
          // this loop is gonna check if the account entered already exist in it
          for (let x = 0; x < obj[platfromInpValue].length ; x++){
            const el = obj[platfromInpValue][x];
            if (!el.username){
              if (el.email === element.email){
                err = true;
                break;
              }else continue;
            }else if (!el.email){
              if (el.username === element.username){
                err = true;
                break;
              }else continue;
            }else if (el.email && el.username){
              if (el.username === element.username || el.email === element.email){
                err = true;
                break;           
              }else continue;
            }
          }
          // if the accout exist the error will become true
          if (err){ 
            // if it exist then run a function that'll give it red color and pass the exact element
            stopRightHereMr(element);
            // stop the whole loop cuz we have a problem
            break mainLoop;
          }else{ 
            // if there's no error just push but still don't save to local storage cuz the next element might have an already existing account so we delay the setting to local for now
            obj[platfromInpValue].push(element);
          }
        }
        }

    }else{ // if you wanna save one of the exisitng social 
        //if it has items then there's possibility of an existing account
      if (obj[chosenSocialMedia].length){
        // this loop is checking if the account added already exists in the local storage
        for (let z = 0; z < obj[chosenSocialMedia].length ; z++){
          const el = obj[chosenSocialMedia][z];
          if (!el.username){
            if (el.email === element.email){
              err = true;
              break;
            }else continue;
          }else if (!el.email){
            if (el.username === element.username){
              err = true;
              break;
            }else continue;
          }else if (el.email && el.username){
            if (el.username === element.username || el.email === element.email){
              err = true;
              break;           
            }else continue;
          }
        }
        // same process
        if (err){
          stopRightHereMr(element)
          break mainLoop;
        }else{
          obj[chosenSocialMedia].push(element)
        }

      }else{
        obj[chosenSocialMedia].push(element) 
      }
    }
  }
  // now after all those loops we can safely run this function if the loops didn't detect an error
  if (!err){
    // the function will save to the local storage and return to main buttons page and refresh
    saveFormIsReady(obj)
  }
  
}

// this will save the accounts to local storage and give animation to the check button.
const saveFormIsReady = (param) => {
  localStorage.setItem('savePasswordProject' , JSON.stringify(param));
  checkBtn.style.background = '#63C502'
  checkBtn.classList.add('save-btn-aimation')
  checkBtn.style.borderRadius = '50%';
  setTimeout(() => {
    saveForm.classList.remove('active')
    saveForm.classList.add('inActive')
    setTimeout(() => {
      for (let idx = 0; idx < allBtns.length; idx++) {
        const element = allBtns[idx];
        element.classList.remove('disable')
        setTimeout(() => {
          element.classList.add("active");
          setTimeout(() => {
            document.location.reload()
          }, 500);
        }, 1);
      }
    }, 500);
  }, 700);

}


// this function will give a style to the account window if the account already exists;
// and will also display an error message
const stopRightHereMr = (param) => {
  const accountsToSave = document.querySelectorAll('.to-loop')
  for (let idx = 0 ; idx < accountsToSave.length; idx++){
    const element = accountsToSave[idx];
    const usernameInput = element.firstElementChild.nextElementSibling.lastElementChild;
    const emailInput = element.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;

    if (!param.username){
      if (emailInput.value === param.email){
        displayError(element)
        break;
      }else continue;
    }else if (!param.email){
      if (usernameInput.value === param.username){
        displayError(element)
        break;
      }else continue;
    }else if (param.username && param.email){
      if (usernameInput.value === param.username || emailInput.value === param.email){
        displayError(element)
        break;
      }else continue;
    }

    function displayError(element){
      element.style.background  = `crimson`
      const header = document.getElementById('save-from-header');
      if (chosenSocialMedia === 'sumElseBtn'){
        header.style.height = `150px`
      }
      const errMsg = document.createElement('h5');
      errMsg.textContent = `username or email already exist`;
      errMsg.classList.add('error-msg-save-form');
      header.appendChild(errMsg);
    }
  }
}


// bad practice warning
// bad practice warning
// bad practice warning
// bad practice warning
const fetchIcons ={
  googleIcon : document.querySelector('#google-icon'),
  googleImg : document.getElementById('google-img'),
  snapIcon: document.getElementById('snap-icon'),
  snapImg:   document.getElementById('snap-img'),
  tiktokIcon:  document.getElementById('tiktok-icon'),
  tiktokImg:  document.getElementById('tiktok-img'),


}

const hover = {

  googleHover(){
    fetchIcons.googleIcon.className = '';
    fetchIcons.googleImg.style.display = 'inline'
    
  },
  googleHoverRemove(){
    fetchIcons.googleImg.style.display = 'none'
    fetchIcons.googleIcon.className = '';
    fetchIcons.googleIcon.className = 'fab fa-google'
  },
  snapHover(){
    fetchIcons.snapIcon.className = '';
    fetchIcons.snapImg.style.display = 'inline'
    
  },
  snapHoverRemove(){
    fetchIcons.snapImg.style.display = 'none'
    fetchIcons.snapIcon.className = '';
    fetchIcons.snapIcon.className = 'fab fa-snapchat-square'
  },
  tiktokHover(){
    fetchIcons.tiktokIcon.className = '';
    fetchIcons.tiktokImg.style.display = 'inline'
    
  },
  tiktokHoverRemove(){
    fetchIcons.tiktokImg.style.display = 'none'
    fetchIcons.tiktokIcon.className = '';
    fetchIcons.tiktokIcon.className = 'fab fa-tiktok'
  },
  addEvents(){

    fetchIcons.googleIcon.addEventListener('mouseenter' , hover.googleHover)
    fetchIcons.googleIcon.addEventListener('mouseleave' , hover.googleHoverRemove)
    
    fetchIcons.snapIcon.addEventListener('mouseenter' , hover.snapHover)
    fetchIcons.snapIcon.addEventListener('mouseleave' , hover.snapHoverRemove)
    
    fetchIcons.tiktokIcon.addEventListener('mouseenter' , hover.tiktokHover)
    fetchIcons.tiktokIcon.addEventListener('mouseleave' , hover.tiktokHoverRemove)
  
  }
}
hover.addEvents()
// bad practice warning
// bad practice warning
// bad practice warning
// bad practice warning




// main page events / fetching social media btns on save page / giving them events / 
// add events to "add extra account and save btns"
// add event to the X icon to remove extra account window

function addEvents(){
  // giving events to main page btns
  requestBtn.addEventListener("click", showRequestPage);
  saveBtn.addEventListener("click", showSavePage);
  editBtn.addEventListener("click", showEditPage);
  deleteBtn.addEventListener("click", showDeletePage);

  //fetching social media btns 
  const fetchSaveBtns = {
    instagram : document.querySelector('.instagram'),
    facebook : document.querySelector('.facebook'),
    twitter : document.querySelector('.twitter'),
    google : document.querySelector('.google'),
    twitch : document.querySelector('.twitch'),
    reddit : document.querySelector('.reddit'),
    tiktok : document.querySelector('.tiktok'),
    snapchat : document.querySelector('.snapchat'),
    spotify : document.querySelector('.spotify'),
    discord : document.querySelector('.discord'),
    sumElseBtn : document.querySelector('#none-of-these-btn'),
  }

  // giving them events, they're all gonna disable save page and enable save form
  const saveFromHeader = document.getElementById('save-from-header');
  for (const [key, value] of Object.entries(fetchSaveBtns)) {

    if (key.toString() === 'sumElseBtn'){
      value.addEventListener('click' , function(){
        disableSavePage(key);
        setTimeout(() => {
          saveFromHeader.innerHTML = `
          <div class="s-n-p-h"><h1>Please enter a platform</h1></div>
          <div class="chose-platform-inp-div">
            <label for="platform">
              Platform
            </label>
            <input type="text" name="platform" id="platform" placeholder="ex: Netflix">
          </div>
          `
          saveFromHeader.style.height = '130px';
          saveForm.classList.add('active');
        }, 500);

      })
    }else{
      value.addEventListener('click' , function(){
        disableSavePage(key)
        setTimeout(() => {
          saveForm.classList.add('active');
        }, 500);

    })
    }

  }

  // add event to the X icon to remove extra account window
  saveFormContent.addEventListener('click' , function(param){
    
    if (param.target.classList.contains('fa-times')){
      verifySaveForm()
      param.target.parentElement.parentElement.classList.add('inActive')
      setTimeout(() => {
        param.target.parentElement.parentElement.remove()
      }, 200);
    }
  })

  // add events to "add extra account and save (check) btns"
  saveFormBtnsDiv.addEventListener('click' , function(param){
    if (param.target.classList.contains('add-acc-btn')){
      addExtraAcc()
    }else if(param.target.classList.contains('save-btn')){
      verifyIfFilledInformations()
    }
})


} 
addEvents();


// function to create main object but if it's already exist in the local storage it'll fetch it
// function getMainObject(){
//   let obj;
//   for(let idx = 0 ; idx < localStorage.length ; idx++){
//     const key = localStorage.key(idx);
//     if (key.toString() !== 'savePasswordProject'){
//       obj = {
//         twitter : [],
//         facebook : [],
//         google : [],
//         instagram : [],
//         twitch : [],
//         reddit : [],
//         tiktok : [],
//         snapchat : [],
//         spotify : [],
//         discord : [],

//       };
//     }else{
//       obj = JSON.parse(localStorage.getItem(key))
//       break;
//     }
//   }
//   return obj;
// }
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


// setting the main object to the local storage as soon as the code runs
function setMainObj(){
 let mainObj = getMainObject();
 localStorage.setItem('savePasswordProject' , JSON.stringify(mainObj));
}



// this function is to activate check button if all the informatins are filled
function verifySaveForm(){
  if (document.getElementById('platform')){
  const accountsToSave = document.querySelectorAll('.to-loop')
  
  const usernameElements = [];
  const emailElements = [];
  const passwordElements = [];
  const errors = [];
  const errors2 = [];
  const errors3 = [];
  if (!document.getElementById('platform').value){
    errors3.push('error')
  }

  for (let idx = 0 ; idx < accountsToSave.length; idx++){
    const element = accountsToSave[idx];
    const usernameInput = element.firstElementChild.nextElementSibling.lastElementChild;
    const emailInput = element.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
    const passwordInput = element.lastElementChild.lastElementChild;
    usernameElements.push(usernameInput)
    emailElements.push(emailInput);
    passwordElements.push(passwordInput)
  }

  for (let idx = 0; idx < usernameElements.length; idx++){
      const element = usernameElements[idx];
    for(let idx2 = 0 ; idx2 < emailElements.length; idx2++){
      const element1 = emailElements[idx];
      if (!element.value && !element1.value){
        errors.push('error');
      }
      for(let idx3 = 0 ; idx3< passwordElements.length; idx3++){
        const element2 = passwordElements[idx];
        if (!element2.value){
          errors2.push('error')
        }
        break;
      }
      break;
    }
  }

  if (errors[0] || errors3[0]){
    checkBtn.style.opacity = '40%';
    checkBtn.style.pointerEvents = 'none'
    
  }else {
    if (errors2[0]){

      checkBtn.style.opacity = '40%';
      checkBtn.style.pointerEvents = 'none'

    }else {
      checkBtn.style.opacity = '100%';
      checkBtn.style.pointerEvents = 'unset'
 
    };
  }
 }else{
  const accountsToSave = document.querySelectorAll('.to-loop')
  
  const usernameElements = [];
  const emailElements = [];
  const passwordElements = [];
  const errors = [];
  const errors2 = [];

  for (let idx = 0 ; idx < accountsToSave.length; idx++){
    const element = accountsToSave[idx];
    const usernameInput = element.firstElementChild.nextElementSibling.lastElementChild;
    const emailInput = element.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
    const passwordInput = element.lastElementChild.lastElementChild;
    usernameElements.push(usernameInput)
    emailElements.push(emailInput);
    passwordElements.push(passwordInput)
  }

  for (let idx = 0; idx < usernameElements.length; idx++){
      const element = usernameElements[idx];
    for(let idx2 = 0 ; idx2 < emailElements.length; idx2++){
      const element1 = emailElements[idx];
      if (!element.value && !element1.value){
        errors.push('error');
      }
      for(let idx3 = 0 ; idx3< passwordElements.length; idx3++){
        const element2 = passwordElements[idx];
        if (!element2.value){
          errors2.push('error')
        }
        break;
      }
      break;
    }
  }

  if (errors[0]){
    checkBtn.style.opacity = '40%';
    checkBtn.style.pointerEvents = 'none'
    
  }else {
    if (errors2[0]){

      checkBtn.style.opacity = '40%';
      checkBtn.style.pointerEvents = 'none'

    }else {
      checkBtn.style.opacity = '100%';
      checkBtn.style.pointerEvents = 'unset'
 


    };
  }




 }
}
saveForm.addEventListener('keyup' , verifySaveForm)    


// document.addEventListener('keydown' , function(e){
//   console.log(e.key);
// })
