
// --* to load entire json file need to use it *--///
//******************************************************* 
// const loadThis =()=>{
//     ref = firebase.database().ref("Miluim");

//     // for (let i = 0; i < soldiers.length; i++) {
//     //     const element = soldiers[i];
//     //     SaveOneSolider(element);
        
//     // }

//     SaveOneSolider(soldiers);

    
// }

GlobalDATA=[];

const init = ()=>{

  ReadFrom('Miluim');
  $('#TableHolder').hide();
  $('#MainShow-section').hide();
  $('#header-section').hide();

  if (sessionStorage.getItem('isAllow')) {
    $('#Block').fadeOut();
    $('#TableHolder').fadeIn();
    $('#MainShow-section').fadeIn();
    $('#header-section').fadeIn();
  }
  document.getElementById('passIN').addEventListener('keypress',(e)=>{
    const userpassIN = e.srcElement.value;
    if (e.keyCode==13) {
      const collection = firebase.database().ref('pass');
      collection.on("value", (snapshot) => {
        const data = snapshot.val();
        if (userpassIN==data.pass) {
          sessionStorage.setItem('isAllow',true);
          $('#Block').fadeOut();
          $('#TableHolder').fadeIn();
          $('#MainShow-section').fadeIn();
          $('#header-section').fadeIn();
          
        }
      });
    }
  })
}
const loadRender=(data)=>{
  console.log('LoadRender',data);
  document.getElementById('MainShow-section').innerHTML='';

  for (let i = 0; i < data.length; i++) {
    const solider = data[i];
    RenderOneCard(solider,i);
  }


}
//Render
const RenderOneCard=(Onesolider,index)=>{
let iconHtml = `<img class="iconVe" src="./assets/vegan.png" alt="">`;
let str= `<div class="cardSolider"><img  src="./assets/solider-removebg-preview.png" alt="">`;

if (Onesolider.foodPref=='צמחוני' || Onesolider.foodPref=='טבעוני') {
  str+=iconHtml;
}
str+=`<div class="contentCard">
    <p class="personNumber">${Onesolider.personalNumber}</p>
    <p class="name">${Onesolider.name}</p>
    <a href="">${Onesolider.email}</a>
    <p>${Onesolider.phone}</p>
    <p>${Onesolider.weapon}: (${Onesolider.isRight?'ימין':'שמאל'}) נשק</p>
    <p>${Onesolider.job}</p>
    <p>${Onesolider.education}</p>
</div>
<div class="buttons">
    <button id="X-${index}" onclick="deleteSolider(this.id)" class="btn-X-effect">מחיקה</button>
    <button onclick="UpdateHandler(this.id)" id="U-${index}" class="btn-ok-effect">עריכה</button>
</div>

</div>`;


document.getElementById('MainShow-section').innerHTML+=str;
$('#phMain').fadeIn(1500);
}

const MegaFilter=(str)=>{
  let localArr=[]
  for (let i = 0; i < GlobalDATA.length; i++) {
    const solider = GlobalDATA[i];
    if (solider.name.includes(str)) {
      localArr.push(solider);
    }
    if (solider.personalNumber.includes(str)) {
      localArr.push(solider);

    }
    if (solider.education.includes(str)) {
      localArr.push(solider);

    }
    if (solider.email.includes(str)) {
      localArr.push(solider);

    }
    if (solider.foodPref.includes(str)) {
      localArr.push(solider);

    }
    if (solider.job.includes(str)) {
      localArr.push(solider);

    }
    if (solider.phone.includes(str)) {
      localArr.push(solider);

    }
    if (solider.shoeSize.toString().includes(str)) {
      localArr.push(solider);

    }
    if (solider.uniformSize.includes(str)) {
      localArr.push(solider);

    }
    if (solider.weapon.includes(str)) {
      localArr.push(solider);

    }
    
  }
  return localArr;
  // const result = words.filter((word) => word.length > 6);

}

const changeInput =()=>{
  let str = document.getElementById('searchBar').value;
  console.log('change?',str);
  if (str=='') {
    loadRender(GlobalDATA);
    return;
  }
  let res = MegaFilter(str);
  loadRender(res);
}

const SwitchToTable = ()=>{

  RenderTable();
  $('#tableBTN').fadeOut();
  new DataTable('#DB-Table',{
    order: [[0, 'desc']]
  });
  $('#MainShow-section').fadeOut();
  $('#TableHolder').fadeIn();
  $('#searchBarBTN').fadeOut();
  $('#searchBar').fadeOut();

}
const SwitchtoCard=()=>{
  $('#TableHolder').fadeOut();
  $('#MainShow-section').fadeIn();
  $('#tableBTN').fadeIn();
  $('#searchBarBTN').fadeIn();
  $('#searchBar').fadeIn();
}

const RenderTable=()=>{
  console.log('in render table ',GlobalDATA);
  let str =`<table id="DB-Table" class="display" style="width:100%">
  <thead>
  <tr>
      <th>מספר אישי</th>
      <th>שם מלא</th>
      <th>כתובת מייל</th>
      <th>מס טלפון</th>
      <th>נשק</th>
      <th>עבודה</th>
      <th>השכלה</th>
      <th>?צמחוני</th>
      <th>פעולות</th>


  </tr>
</thead>
<tbody>`;

for (let i = 0; i < GlobalDATA.length; i++) {
  const solider = GlobalDATA[i];
  let isvegen = solider.foodPref == 'הכל'?'לא':'כן';
  if (solider.foodPref == '') {
    isvegen = '';
  }
  str+=`<tr>
  <td>${solider.personalNumber}</td>
  <td>${solider.name}</td>
  <td>${solider.email}</td>
  <td>${solider.phone}</td>
  <td>${solider.weapon}</td>
  <td>${solider.job}</td>
  <td>${solider.education}</td>
  <td>${isvegen}</td>
  <td>  <button style="width:75px; font-size:16px; margin-right:5px;" onclick="UpdateHandler(this.id)" id="U-${i}" class="btn-ok-effect">עריכה</button><button style="width:75px;font-size:16px; margin-left:5px;" id="X-${i}" class="btn-X-effect">מחיקה</button></td>
</tr>`
}
  str+=`</tbody>`;
  str+=`<tfoot>
  <tr>
  <th>מספר אישי</th>
  <th>שם מלא</th>
  <th>כתובת מייל</th>
  <th>מס טלפון</th>
  <th>נשק</th>
  <th>עבודה</th>
  <th>השכלה</th>
  <th>?צמחוני</th>
  <th>פעולות</th>
</tr>
</tfoot>
`;
document.getElementById('DT-PH').innerHTML = str;
}

const UpdateHandler =(id)=>{
  let idDataPass = id.replace('U-','');
  console.log('you click me ', idDataPass);
  sessionStorage.setItem('Data',idDataPass);
  window.location.assign('./RegisterForm.html');

}

const deleteSolider=(id)=>{
  //console.log(id.replace("X-",''));
  const index = id.replace("X-",'');
  let tempData =[];
  for (let i = 0; i < GlobalDATA.length; i++) {
    const solider = GlobalDATA[i];
    if (i!=index) {
      tempData.push(solider);

    }
    
  }
  GlobalDATA = tempData;
  Save(GlobalDATA);
}



//////////////FireBase
// const SaveOneSolider = (json) => {
//     ref.child(json.personalNumber+'---'+json.name).set(json);
//   };
  
const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      GlobalDATA = data;
      // console.log(Object.keys(data).length)
      loadRender(data);
    });
};

const Save = (value) => {
  ref = firebase.database().ref("Miluim");
  ref.child('Miluim').set(value);
};