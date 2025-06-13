 
import AddAndEditDrawer from "../components/AddAndEditDrawer";
import { apiService } from "../api/apiService";
import { Input, Checkbox, Form, Row, Col, InputNumber, Button, Popconfirm, message, Select } from 'antd';
  // Adjust the path based on your project structure
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
  // Adjust the path based on your project structure
import Table, { ColumnsType } from "antd/es/table";
import { Category, Company, Lookup } from "../types/category";
import {Edit2Icon } from "lucide-react";
import { useEffect, useState } from "react";
 
 
const Categorys = () => {
      const [open, setOpen] = useState(false);
      const [drawerTitle, setDrawerTitle] = useState("Lookup Add");
      const [form] = Form.useForm();
      const [loading, setloading] = useState(true)
      const [ListOfCatagory, setListOfCatagory] = useState<Category[]>([])
      const [company , setcompany]= useState<any>("")
      const[Id,setId] = useState("")
   
     useEffect(() => {
    getcategory();
    getCommpany();
   }, [])
    
    
     const getcategory=()=>{
      setloading(true)
      apiService.getAll(
                `category`
              )
              .then((response) => {
                setloading(false)
                 const companyData: Category = response.data;
                 setListOfCatagory(companyData as unknown as Category[]);
                 //console.log(companyData);
              });
     }
     const getCommpany =()=>
     {
    apiService
            .getAll(
              `Company`
            )
            .then((response) => {
               const companyData = response.data;
              setcompany(companyData[0]?.id);
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
          var categorysave =  {
            isActive: true,
            createdBy: "createdBy",
            createdAt: "2025-04-08T21:00:00.000Z",
            updatedAt: null,
            remark: "",
            companyId: company,
            type: values?.type,
            name: values?.name,
            description: values?.description,
            parentId:"",
            imagePath :"",
            videoPath :"",
          }
          
       apiService.create("category", categorysave).then((response) => {
          message.success('ListOfCatagory saved successfully');
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
       getcategory()
       setId("")
       closeDrawer();
      }
      };
      const onEdit = (formValue: Lookup) => {
        form.setFieldsValue(formValue);
        setId(formValue?.id);
        setOpen(true);
      };
      const handleDelete = async (id: string) => {
        apiService.remove("category", id).then((response) => {
          message.success('category Delete successfully');
          getcategory();
       });
      };
    

      const columns: ColumnsType<Category> = [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 300,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          width: 300,
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Is Default',
          dataIndex: 'isDefault',
          key: 'isDefault',
          render: (checked: boolean) => <Checkbox checked={checked} />,
        },
        {
          title: 'Is Active',
          dataIndex: 'isActive',
          key: 'isActive',
          render: (checked: boolean) => <Checkbox checked={checked} />,
        },
    
        {
          title: 'Action',
          key: 'operation',
          align: 'center',
          width: 100,
          render: (_: any, record: Category) => (
            <div className="flex w-full justify-center text-gray space-x-3">
              <Button onClick={() => onEdit(record)}>
                <Edit2Icon/>
                 
              </Button>
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
    
  
  
    const CategoryForm = () => (
      <Form form={form} layout="vertical">
       <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter Name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
       
        <Form.Item label="Type" name="type">
        
        <Select
    showSearch
    placeholder="Select a Type"
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      { value: 'Food', label: 'Food' },
      { value: 'Drink', label: 'Drink' },
      { value: 'Alcoholic', label: 'Alcoholic' },
    ]}
  />
        </Form.Item>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Is Default" name="isDefault" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={16}>
          <Form.Item label="Is Active" name="isActive" valuePropName="checked">
          <Checkbox checked />
        </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item label="Image Path" name="imagePath">
          <Input />
        </Form.Item> */}
        <Form.Item label="Video Path" name="videoPath">
          <Input />
        </Form.Item>
       
      </Form>
    );
  
  return (
    <>
    <div className="w-full px-4  py-2 ">
    <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Add Category')}>
                            New
                        </Button>
<div className="py-2">
<Table
                        rowKey="id"
                        size="small"
                        scroll={{ x: 'max-content' }}
                        pagination={{ pageSize: 10 }}
                        columns={columns}
                        dataSource={ListOfCatagory}
                        loading={loading}

                    />
</div>
            

    </div>
    <AddAndEditDrawer
  title={drawerTitle}
  open={open} onClose={closeDrawer}
  onSave={handleSave}
  content={<CategoryForm />}
  width={420}
/>

    </>
    
  )
}

export default Categorys
