

const lookup = () => {
  return (
    <div>
      lookup
    </div>
  )
}

export default lookup


// import { useEffect, useState } from "react";
// import AddAndEditDrawer from "../components/AddAndEditDrawer";
// import { Input, Checkbox, Form, Row, Col, InputNumber, Button, Popconfirm, message } from 'antd';
// // Adjust the path based on your project structure
// import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
// // Adjust the path based on your project structure
// import Table, { ColumnsType } from "antd/es/table";

// import { Edit2Icon } from "lucide-react";


// const Lookups = () => {
//   const [open, setOpen] = useState(false);
//   const [drawerTitle, setDrawerTitle] = useState("Lookup Add");
//   const [form] = Form.useForm();
//   const [loading, setloading] = useState(true)
//   const [ListOfLookup, setListOfLookup] = useState<Lookup[]>([])
//   const [company, setcompany] = useState<any>("")
//   const [Id, setId] = useState("")
//   useEffect(() => {
//     getLookup();
//     getCommpany();
//   }, [])

//   const getLookup = () => {
//     setloading(true)
//     apiService.getAll(
//       `Lookup`
//     )
//       .then((response) => {
//         setloading(false)
//         const companyData: Lookup = response.data;
//         setListOfLookup(companyData as unknown as Lookup[]);
//         //console.log(companyData);
//       });
//   }
//   const getCommpany = () => {
//     apiService
//       .getAll(
//         `Company`
//       )
//       .then((response) => {
//         const companyData = response.data;
//         setcompany(companyData[0]?.id);
//       });
//   }
//   const showDrawer = (title: string) => {
//     form.resetFields();
//     setDrawerTitle(title);
//     setOpen(true);
//   };
//   const closeDrawer = () => {
//     setOpen(false);
//   };
//   const handleSave = async () => {
//     const values = await form.validateFields()
//     if (values) {

//       if (!Id) {
//         var lookusave = {
//           isActive: true,
//           createdBy: "createdBy",
//           createdAt: "2025-04-08T21:00:00.000Z",
//           updatedAt: null,
//           remark: "",
//           companyId: company,
//           type: "Food",
//           name: values?.name,
//           description: values?.description,
//           value: values?.value,
//           index: values?.index,
//           isDefault: true
//         }

//         apiService.create("Lookup", lookusave).then((response) => {
//           message.success('Lookup saved successfully');
//         });
//       }
//       else {
//         var updateLookup = {
//           isActive: true,
//           createdBy: "createdBy",
//           createdAt: "2025-04-08T21:00:00.000Z",
//           updatedAt: null,
//           remark: "",
//           type: "Food",
//           name: values?.name,
//           description: values?.description,
//           value: values?.value,
//           index: values?.index,
//           isDefault: true
//         }

//         apiService.update("Lookup", updateLookup, Id).then((response) => {
//           message.success('Lookup saved successfully');
//         });
//       }
//       getLookup()
//       setId("")
//       closeDrawer();
//     }
//   };
//   const onEdit = (formValue: Lookup) => {
//     form.setFieldsValue(formValue);
//     setId(formValue?.id);
//     setOpen(true);
//   };
//   const handleDelete = async (id: string) => {
//     apiService.remove("Lookup", id).then((response) => {
//       message.success('Lookup Delete successfully');
//       getLookup();
//     });
//   };

//   const columns: ColumnsType<Lookup> = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       width: 300,
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       width: 300,
//     },
//     {
//       title: 'Value',
//       dataIndex: 'value',
//     },
//     {
//       title: 'Is Default',
//       dataIndex: 'isDefault',
//       key: 'isDefault',
//       render: (checked: boolean) => <Checkbox checked={checked} />,
//     },
//     {
//       title: 'Is Active',
//       dataIndex: 'isActive',
//       key: 'isActive',
//       render: (checked: boolean) => <Checkbox checked={checked} />,
//     },

//     {
//       title: 'Action',
//       key: 'operation',
//       align: 'center',
//       width: 100,
//       render: (_: any, record: Lookup) => (
//         <div className="flex w-full justify-center text-gray space-x-3">
//           <Button onClick={() => onEdit(record)}>
//             <Edit2Icon />

//           </Button>
//           <Popconfirm
//             title="Delete this record"
//             okText="Yes"
//             cancelText="No"
//             placement="left"
//             onConfirm={() => handleDelete(record?.id)} // Handle delete event on Yes
//           >
//             <Button>
//               <DeleteFilled className="text-red-500" />
//             </Button>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];








//   const LookupForm = () => (
//     <Form form={form} layout="vertical">
//       <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter Name' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item label="Description" name="description">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Index" name="index">
//         <InputNumber />
//       </Form.Item>
//       <Form.Item label="Value" name="value">
//         <Input />
//       </Form.Item>
//       <Row gutter={24}>
//         <Col span={8}>
//           <Form.Item label="Is Default" name="isDefault" valuePropName="checked">
//             <Checkbox />
//           </Form.Item>
//         </Col>
//         <Col span={16}>
//           <Form.Item label="Is Active" name="isActive" valuePropName="checked">
//             <Checkbox checked />
//           </Form.Item>
//         </Col>
//       </Row>


//     </Form>
//   );

//   return (
//     <>
//       <div className="w-full px-4  py-2 ">
//         <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Add Lookup')}>
//           New
//         </Button>
//         <div className="py-2">
//           <Table
//             rowKey="id"
//             size="small"
//             scroll={{ x: 'max-content' }}
//             pagination={{ pageSize: 10 }}
//             columns={columns}
//             dataSource={ListOfLookup}
//             loading={loading}
//           />
//         </div>


//       </div>
//       <AddAndEditDrawer
//         title={drawerTitle}
//         open={open} onClose={closeDrawer}
//         onSave={handleSave}
//         content={<LookupForm />}
//         width={420}
//       />

//     </>

//   )
// }

// export default Lookups
