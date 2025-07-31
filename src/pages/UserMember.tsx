import { useEffect, useState } from "react";
import { createApiServiceHook } from "../hooks/createApiServiceHook";
import { Item } from "../types/WorkoutPlan";
import { Input, Checkbox, Form, Button, Popconfirm, message, Table, Select } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { Edit2Icon } from "lucide-react";
import { User } from "../types/User";
import AddAndEditDrawer from "../components/AddAndEditDrawer";
const { Option } = Select;


const UserMember = () => {
  const UserRole = [
    'MEMBER',
    "Trainer",
    'Admin'
  ]
  const UserService = createApiServiceHook<User>('users');
  const [items, setItems] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("Add User");
  const [form] = Form.useForm();
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [value, setValue] = useState(UserRole[0]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const {
    getAll,
    create,
    update,
    delete: deleteById,
  } = UserService();

  // Fetch all items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await getAll({
        page,
        limit: pageSize
      });

      if (response.success && response.data) {
        setItems(response.data?.items as User[]);
        setPagination({
          current: page,
          pageSize: pageSize,
          total: response.data?.total || 0,
        });
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.error("Error fetching items:", ex);
    }
  };

  const showDrawer = (title: string) => {
    setDrawerTitle(title);
    form.resetFields()
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const handleSave = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (id) {
          // Update existing item
          const response = await update(id, values);
          if (response.success) {
            setItems(items.filter(item => item.id !== id));
            form.resetFields();
            setId('')
            setOpen(false);
          }
        } else {
          // Create new item
          const formData = new FormData();
          formData.append('fullName', values.fullName);
          formData.append('email', values.email);
          formData.append('phone', values.phone);
          formData.append('password', values.password);
          formData.append('role', values.role);
          formData.append('image', imageFile as File);


          //values.imagePath = imageFile; // Use the file path or URL
          const response = await create(formData as unknown as User);
          if (response.success && response.data) {
            if (Array.isArray(response.data)) {
              setItems([...items, ...response.data]);
            } else {
              setItems([...items, response.data]);
            }
            form.resetFields();
            setId('')
            setOpen(false);
          }
        }
      })
      .catch(() => {
        // Validation failed
      });
  };


  const onChange = (value: string) => {
    setValue(value);
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      console.log(file)
      // You keep the binary file here
      setPreviewUrl(URL.createObjectURL(file)); // Preview using object URL
    }
  };

  const UserForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter Full Name' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Phone No" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter Password' }]}>
        <Input type="password" />
      </Form.Item>
      {/* <Form.Item label="Confirm Password" name="createdAt" rules={[{ required: true, message: 'Please enter Confirm Password' }]}>
        <Input type="password" />
      </Form.Item> */}

      <Form.Item label="User Role" name="role" rules={[{ required: true, message: 'Please select role' }]}>
        <Select
          placeholder="Select user role"
          value={value}
          onChange={onChange}
          style={{ width: 200 }}
        >
          {Object.values(UserRole).map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
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

    </Form >
  );

  const onEdit = async (item: Item) => {
    setDrawerTitle("Edit User");
    form.setFieldsValue(item);
    setId(item?.id)
    setOpen(true);
  }

  const handleDelete = async (id: string) => {
    try {
      // Optimistically update UI
      const prevItems = [...items];
      setItems(items.filter(item => item.id !== id));

      const response = await deleteById(id);
      if (!response.success) {
        // Revert if API fails
        setItems(prevItems);
        throw new Error('Delete failed');
      }
      message.success('Item deleted successfully');
      form.resetFields();
      setId('');

      // Refresh data to ensure consistency
      fetchItems(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      width: 300,
      sorter: {
        compare: (a, b) => a?.fullName.localeCompare(b?.fullName),
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 300,
      sorter: {
        compare: (a, b) => a?.email.localeCompare(b?.email),
      },
    },
    {
      title: 'Phone No',
      dataIndex: 'phone',
      sorter: {
        compare: (a, b) => a.phone?.localeCompare(b?.phone),
      },
    },
    {
      title: 'Is Available',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      sorter: {
        compare: (a, b) => String(a.isAvailable ?? '').localeCompare(String(b.isAvailable ?? '')),
      },
      render: (checked: boolean) => <Checkbox checked={checked} />,
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_: any, record: Item) => (
        <div className="flex w-full justify-center text-gray space-x-3">
          <Button onClick={() => onEdit(record)}>
            <Edit2Icon />

          </Button>
          <Popconfirm
            title="Delete this record"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => handleDelete(record?.id)} // Handle delete event on Yes
          >
            <Button>
              <DeleteFilled className="text-red-500" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];


  return (
    <div className="w-full">
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Add User')}>
        New
      </Button>
      <div className="border-t mt-2">
      </div>
      <div className="py-2">
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={items}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={(newPagination) => {
            fetchItems(newPagination.current, newPagination.pageSize);
          }}
        />
      </div>


      <AddAndEditDrawer
        title={drawerTitle}
        open={open} onClose={closeDrawer}
        onSave={handleSave}
        content={<UserForm />}
        width={420}
      />
    </div>
  )
}

export default UserMember
