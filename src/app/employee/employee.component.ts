import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
name:any;
email:any;
mobile:any;
error:any;
department:any;
role:any;
residentialAddress:any;
dataForm: FormGroup;
dataPresent:boolean;
userRole:any;
isLoader:any;
    

constructor(private frmbuilder: FormBuilder,private http: HttpClient,private router: Router,private auth: AuthService) {
this.dataForm =this.frmbuilder.group({
  
  });
  this.userRole=localStorage.getItem("role");
  this.dataPresent=false;

    }

    ngOnInit() {
     
      
        this.dataForm = this.frmbuilder.group({
            
            name: ['', [Validators.required,Validators.pattern("[0-9]{6}$")]],
            mobile: ['',[Validators.required,Validators.pattern("^[0-9]{10}$")] ],
            email: ['', [Validators.required,Validators.maxLength(200),Validators.email]],
            
            department: ['', Validators.required],
            role:['', Validators.required],
            residentialAddress:['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
            });
            
        // read data on component initialization    

    }
    get f(){
      return this.dataForm.controls;
    }
    public hasError = (controlName: string, errorName: string) =>{
      return this.dataForm.controls[controlName].hasError(errorName);
    }
    postData(){

    console.log(this.dataForm)  ;

    let loginForm = this.dataForm.value;

    let request = {
     
     
        "residentialAddress": loginForm.residentialAddress,
        "role": loginForm.role  ,
        "email": loginForm.email ,
        "department": loginForm.department ,
         "mobile": loginForm.mobile ,
        "username": loginForm.name 
      
    }

    console.log("User add req ",request);

    this.auth.doPost(request,"/api/add/user").subscribe((res:any) => {
      console.log(res.statusCode);

      if(res.statusCode == 200){
        this.dataForm.reset('');
       this.error= "User added successfuly";
      }else if(res.statusCode == 403){
        this.error= "Field validation error";
      }
      else if(res.statusCode == 500){
        this.error= "Failed to add user";
      }
      
        
    })

    }



    fecthData(){
      this.isLoader=true;
      console.log(this.dataForm)  ;
      
      let loginForm = this.dataForm.value;
  
      let request = {
         
         
          "username" :loginForm.name 
        
      }
  
      console.log("User fetch req ",request);
  
      this.auth.doPost(request,"/api/fetch/user").subscribe((res:any) => {
       
      console.log(res);

      if(res.statusCode == 200){
        this.dataPresent=true;
        this.dataForm.reset('');
        this.name= res.data.username;
        this.email=res.data.email;
        this.mobile=res.data.mobile;
        this.role=res.data.role;
        this.department=res.data.department;
        this.isLoader=false;
       
      }else if(res.statusCode == 403){
        this.error= "Field validation error";
      }
      else if(res.statusCode == 500){
        this.error= "Failed to fetch user details";
      }
      

        
      })
  
      }
}
