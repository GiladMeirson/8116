
import Solider from './solider';






const suckObject = () => {
    // personalNum
    // fullName
    // phone
    // email
    // job
    // birthDay
    // ArmyDate
    // shoe

    let personalNum = document.getElementById('personalNum').value;
    let fullName = document.getElementById('fullName').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let job = document.getElementById('job').value;
    let birthDay = document.getElementById('birthDay').value;
    let ArmyDate = document.getElementById('ArmyDate').value;
    let shoe = document.getElementById('shoe').value;

    const solider = new Solider(personalNum,fullName,phone,email,job,birthDay,ArmyDate,shoe);
    const bool = solider.validation();

    if (!bool) {
        //swal
    }
    else {
        //swal.then() --> send firebase.
    }

    
}