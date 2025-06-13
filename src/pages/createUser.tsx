import { useEffect, useState } from "react";
import AddAndEditDrawer from "../components/AddAndEditDrawer";
import { apiService } from "../api/apiService";
import { Input, Checkbox, Form, Row, Col, Button, Popconfirm, message, Select } from 'antd';
  // Adjust the path based on your project structure
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
  // Adjust the path based on your project structure
import Table, { ColumnsType } from "antd/es/table";
import { user } from "../types/category";
 
 
const CreateUser = () => {
      const [open, setOpen] = useState(false);
      const [drawerTitle, setDrawerTitle] = useState("user Add");
      const [form] = Form.useForm();
      const [loading, setloading] = useState(true)
      const [ListOfuser, setListOfuser] = useState<user[]>([])
      const[Id,setId] = useState("")
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
                 const companyData: user = response.data;
                 setListOfuser(companyData as unknown as user[]);
                 //console.log(companyData);
              });
     }
     
      const showDrawer = (title: string) => {
        form.resetFields();
        setDrawerTitle(title);
        setOpen(true);
      };
      const closeDrawer = () => {
        setOpen(false);
      };
      const handleSave = async () => {
        const values = await form.validateFields()
        if(values)
        {
       
        if(!Id)
        {
          var usersave =  {
        fullName: "Girma Fetene",
        email: "G2@gmail.com",
        userName : "Gname",
        password: "123456"
          }
          
       apiService.create("auth/register", usersave).then((response) => {
          message.success('Create User successfully');
       });
       }
       else{
        var updatecategory =  {
          isActive: true,
          createdBy: "createdBy",
          createdAt: "2025-04-08T21:00:00.000Z",
          updatedAt: null,
          remark: "",
          type: values?.type,
          name: values?.name,
          description: values?.description,
          parentId:"",
          
        }
        
        apiService.update("category", updatecategory,Id).then((response) => {
          message.success('category saved successfully');
       });
       }
       getUser()
       setId("")
       closeDrawer();
      }
      };
      const onEdit = (formValue: user) => {
        form.setFieldsValue(formValue);
        setId(formValue?.id);
        setOpen(true);
      };
      const handleDelete = async (id: string) => {
        apiService.remove("User", id).then((response) => {
          message.success('User Delete successfully');
          getUser();
       });
      };
    
      const columns: ColumnsType<user> = [
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          width: 300,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          width: 300,
        },
        {
          title: 'User Name',
          dataIndex: 'userName',
        },
        {
          title: 'Action',
          key: 'operation',
          align: 'center',
          width: 100,
          render: (_: any, record: user) => (
            <div className="flex w-full justify-center text-gray space-x-3">
              {/* <Button onClick={() => onEdit(record)}>
                <Edit2Icon/>
                 
              </Button> */}
              <Popconfirm
                title="Delete this record"
                okText="Yes"
                cancelText="No"
                placement="left"
                onConfirm={() => handleDelete(record?.id)} // Handle delete event on Yes
              >
                <Button>
                 <DeleteFilled className="text-red-500"/>
                </Button>
              </Popconfirm>
            </div>
          ),
        },
      ];
    
    

    
       


  
    const UserForm = () => (
      <Form form={form} layout="vertical">
       <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter Full Name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="email" name="email" rules={[{ required: true, message: 'Please enter Full Name' }]}>
          <Input type="email"/>
        </Form.Item>
       
        <Form.Item label="User Name" name="userName">
         <Input />
        </Form.Item>
        
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter Full Name' }]}>
         <Input type="password" />
        </Form.Item>
        <Form.Item label="Confirm Password" name="Confpassword" rules={[{ required: true, message: 'Please enter Full Name' }]}>
         <Input  type="password"/>
        </Form.Item>
       
      </Form>
    );
  
  return (
    <>
    <div className="w-full px-4  py-2 ">
    <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Create User')}>
                            New
                        </Button>
<div className="py-2">
<Table
                        rowKey="id"
                        size="small"
                        scroll={{ x: 'max-content' }}
                        pagination={{ pageSize: 10 }}
                        columns={columns}
                        dataSource={ListOfuser}
                        loading={loading}

                    />
</div>
            

    </div>
    <AddAndEditDrawer
  title={drawerTitle}
  open={open} onClose={closeDrawer}
  onSave={handleSave}
  content={<UserForm />}
  width={420}
/>

    </>
    
  )
}

export default CreateUser