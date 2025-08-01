import { useEffect, useState } from "react";
import { createApiServiceHook } from "../hooks/createApiServiceHook";
import { Item } from "../types/WorkoutPlan";
import AddAndEditDrawer from "../components/AddAndEditDrawer";
import { Input, Checkbox, Form, Row, Col, InputNumber, Button, Popconfirm, message, Table } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { Edit2Icon } from "lucide-react";



const Product = () => {
  const useItemService = createApiServiceHook<Item>('items');
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("Add Products");
  const [form] = Form.useForm();
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(true)

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
  } = useItemService();

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
        setItems(response.data?.items as Item[]);
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
          const response = await create(values);
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

  const ProductForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter Name' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Input />
      </Form.Item>
      <Form.Item
        label="Is Available"
        name="isAvailable"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
    </Form>
  );

  const onEdit = async (item: Item) => {
    setDrawerTitle("Edit Product");
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

  const columns: ColumnsType<Item> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      sorter: {
        compare: (a, b) => a?.name.localeCompare(b?.name),
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 300,
      sorter: {
        compare: (a, b) => a?.description.localeCompare(b?.description),
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: {
        compare: (a, b) => a.category?.localeCompare(b?.category),
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
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Add Product')}>
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
        content={<ProductForm />}
        width={420}
      />
    </div>
  )
}

export default Product
