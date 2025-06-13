
import { Input, Form, Card } from 'antd';
import { useEffect, useState } from 'react';
import { apiService } from '../api/apiService';
import { user } from '../types/category';
 
const ChangePassword = () => {
    const [form] = Form.useForm();
    const [loading, setloading] = useState(false)
    const [CurrentUser, setCurrentUser] = useState<user[] | undefined>()
    useEffect(() => {
        getUser();
       }, [])

         const getUser=()=>{
          setloading(true)
          apiService.getAll(
                    `auth`
                  )
                  .then((response) => {
                    setloading(false)
                    console.log(response.data)
                     const companyData = response?.data;
                     console.log(localStorage.getItem("email"))
                     console.log(companyData?.filter((x: { email: string; }) => x.email?.trim() == localStorage.getItem("email")?.trim()))
                     setCurrentUser(companyData as user[]);
                     //console.log(companyData);
                  });
         }
  return (
    <div className="w-full px-4  py-2 ">
        <Card
        title="User Information"
         
        >
            <div>
            <p>Full Name  : </p> <p>{CurrentUser?.fullName}</p>
            </div>
            <div>
            <p>Email  : </p> <p>{CurrentUser?.email}</p>
            </div>
            <div>
            <p>User Name  : </p> <p>{CurrentUser?.userName}</p>
            </div>
        </Card>
        <Card
        title="Cange Password"
        className="lg:w-1/2 mt-4"
        
        >
        <Form form={form} layout="vertical">
       
        
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter Full Name' }]}>
         <Input type="password" />
        </Form.Item>
        <Form.Item label="Confirm Password" name="Confpassword" rules={[{ required: true, message: 'Please enter Full Name' }]}>
         <Input  type="password"/>
        </Form.Item>
       
      </Form>
        </Card>
       
        
        </div>
  )
}

export default ChangePassword