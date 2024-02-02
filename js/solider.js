class Solider {
    constructor(personalNum,fullName,phone,email,job,birthDay,ArmyDate,shoe){
        this.personalNum=personalNum;
        this.fullName=fullName;
        this.phone=phone;
        this.email=email;
        this.job=job;
        this.birthDay=birthDay;
        this.ArmyDate=ArmyDate;
        this.shoe=shoe;
    }
    validation(){
        if (this.ArmyDate=='' || this.ArmyDate == null) {
            return false;
        }
        if (this.personalNum=='' || this.personalNum == null) {
            return false;
        }
        else{
            this.personalNum = parseInt(this.personalNum);
        }
        if (this.fullName=='' || this.fullName == null) {
            return false;
        }
        if (this.phone=='' || this.phone == null || this.phone.length!=10) {
            return false;
        }
        if (this.email=='' || this.email == null) {
            return false;
        }
        if (this.job=='' || this.job == null) {
            return false;
        }
        if (this.birthDay=='' || this.birthDay == null) {
            return false;
        }
        if (this.shoe=='' || this.shoe == null) {
            return false;
        }
        else {
            this.shoe = parseInt(this.shoe);
        }
        return true;
    }

    post(){
        //firebase
    }
}


export default  class {solider};