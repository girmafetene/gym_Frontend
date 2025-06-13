import { useEffect, useState } from "react";
import AddAndEditDrawer from "../components/AddAndEditDrawer";
import { apiService } from "../api/apiService";
import { Input, Checkbox, Form, Row, Col, InputNumber, Button, Popconfirm, message, Select } from 'antd';
const { Option } = Select;
  // Adjust the path based on your project structure
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
  // Adjust the path based on your project structure
import Table, { ColumnsType } from "antd/es/table";
import { Category, Product } from "../types/category";
import {Edit2Icon } from "lucide-react";
import { BASE_URL } from "../env";
 
 
const Products = () => {
      const [open, setOpen] = useState(false);
      const [drawerTitle, setDrawerTitle] = useState("Product Add");
      const [form] = Form.useForm();
      const [loading, setloading] = useState(true)
      const [ListOfCatagory, setListOfCatagory] = useState<Category[]>([])
      const [ListOfProduct, setListOfProduct] = useState<Product[]>([])
      const [company , setcompany]= useState<any>("")
      const [LookupId , setLookupId]= useState<any>("")
      
      const[Id,setId] = useState("")
      const [imageFile, setImageFile] = useState<File | null>(null);
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);
   useEffect(() => {
    getcategory();
    getCommpany();
    getProduct();
    getLookup();
   }, [])
    
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); 
      console.log(file)
      // You keep the binary file here
      setPreviewUrl(URL.createObjectURL(file)); // Preview using object URL
    }
  };
   
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
     const getLookup =()=>
        {
       apiService
               .getAll(
                 `Lookup`
               )
               .then((response) => {
                  const companyData = response.data;
                  setLookupId(companyData[0]?.id);
               });
        }
     const getProduct =()=>
        {
       apiService
               .getAll(
                 `products`
               )
               .then((response) => {
                setloading(false)
                 const companyData: Product = response.data;
                 setListOfProduct(companyData as unknown as Product[]);
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
        const values = await form.validateFields();
        if (!values) return;
      
        const formData = new FormData();
        formData.append("id", Id);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("detail", "details");
        formData.append("type", "food");
        formData.append("price", values.price);
        formData.append("hasDiscount", "false");
        formData.append("createdBy", "Admin");
        formData.append("createdAt", "2/3/2023");
        formData.append("updatedBy", "Admin");
        formData.append("categoryId", values.categoryId);
        formData.append("lookupId", LookupId);
        formData.append("companyId", company);
        
        if (imageFile) {
          formData.append("image", imageFile); // 👈 send image as binary
        }
      
        try {
           
            await apiService.create("products", formData); // ⬅️ use `createForm` (custom)
            message.success("Product saved successfully");
          // } else {
          //   await apiService.update("products", formData, Id); // ⬅️ custom update function
          //   message.success("Product updated successfully");
          // }
      
          getProduct();
          setId("");
          closeDrawer();
        } catch (error) {
          message.error("Error saving product");
          console.error(error);
        }
      };
      
      const onEdit = async (formValue: Product) => {
         console.log(formValue?.category?.id)
        const imageUrl = `${BASE_URL}${formValue?.imagePath}`;
        setPreviewUrl(imageUrl); // for preview
      
        // Fetch image as blob and convert to File
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const filename = formValue.imagePath.split('/').pop(); // just the file name
        const file = new File([blob], filename || "default-filename", { type: blob.type });
      
        setImageFile(file); 

        form.setFieldsValue(formValue);
        form.setFieldsValue({
          companyId:formValue?.category?.id ,
        });
        setId(formValue?.id);
        console.log(formValue)
        setOpen(true);
      };
      const handleDelete = async (id: string) => {
        apiService.remove("products", id).then((response) => {
          message.success('products Delete successfully');
          getcategory();
       });
      };
    
      const columns: ColumnsType<Product> = [
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
          render: (_: any, record: Product) => (
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
    
    const ProductForm = () => (
      <Form form={form} layout="vertical">
       <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter Name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Select  Category' }]}>
        <Select
        showSearch
          placeholder="Select an Category">
      {ListOfCatagory.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
         
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
        <Form.Item label="Image Path" name="imagePath">
        <div className="p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-64 h-64 object-cover rounded border"
          />
        </div>
      )}
    </div>
        </Form.Item>
       
      </Form>
    );
  
  return (
    <>
    <div className="w-full px-4  py-2 ">
    <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Add Product')}>
                            New
                        </Button>
<div className="py-2">
<Table
                        rowKey="id"
                        size="small"
                        scroll={{ x: 'max-content' }}
                        pagination={{ pageSize: 10 }}
                        columns={columns}
                        dataSource={ListOfProduct}
                        loading={loading}
                    />
</div>
            

    </div>
    <AddAndEditDrawer
  title={drawerTitle}
  open={open} onClose={closeDrawer}
  onSave={handleSave}
  content={<ProductForm />}
  width={420}
/>

    </>
    
  )
}

export default Products
