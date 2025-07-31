import { useEffect, useState } from "react";
import { createApiServiceHook } from "../hooks/createApiServiceHook";
import { Input, Checkbox, Form, Button, Popconfirm, message, Table, Select } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { Edit2Icon } from "lucide-react";
import { User } from "../types/User";
import AddAndEditDrawer from "../components/AddAndEditDrawer";
import { Schedule } from "../types/Schedule";

const { TextArea } = Input;

const Schedules = () => {

    const schedulesService = createApiServiceHook<Schedule>('schedules');
    const UserService = createApiServiceHook<User>('users');

    const [items, setItems] = useState<Schedule[]>([]);
    const [Trainer, setTrainer] = useState<User[]>([]);


    const [open, setOpen] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState("Add Schedule");
    const [form] = Form.useForm();
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(true)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

    } = schedulesService();

    const {
        getByType,
    } = UserService();

    // Fetch all items on mount
    useEffect(() => {
        fetchItems();
        fetchTrainer();
    }, []);

    const fetchItems = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const response = await getAll({
                page,
                limit: pageSize
            });

            if (response.success && response.data) {
                setItems(response.data?.items as Schedule[]);
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
    const fetchTrainer = async () => {
        try {
            setLoading(true);
            const response = await getByType("Trainer");
            if (response.success && response.data) {
                setTrainer(response?.data as User[]);
                //console.log("Trainer data:", response.data);
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


    // const onChange = (value: string) => {
    //     setValue(value);
    // }

    const ScheduleForm = () => (
        <Form form={form} layout="vertical">
            <Form.Item label="Trainer" name="trainerId" rules={[{ required: true, message: 'Please enter Full Name' }]}>

                <Select
                    showSearch
                    placeholder="Select a Trainer"
                    options={Trainer.map(day => ({ label: day.fullName, value: day.id }))}
                />

            </Form.Item>
            <Form.Item label="Day" name="day" rules={[{ required: true, message: 'Please enter day' }]}>
                <Select
                    showSearch
                    placeholder="Select a day"
                    options={daysOfWeek.map(day => ({ label: day, value: day }))}
                />
            </Form.Item>
            <Form.Item label="Start Time" name="startTime" rules={[{ required: true, message: 'Please enter start time' }]}>

                <div className="flex">
                    <Input type="time" id="startTime" className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" required />
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </Form.Item>
            <Form.Item label="End Time" name="endTime" rules={[{ required: true, message: 'Please enter end time' }]}>

                <div className="flex">
                    <Input type="time" id="endTime" className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" required />
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </Form.Item>
            <Form.Item label="Activity" name="activity" >
                <TextArea rows={4} placeholder="activity " />
            </Form.Item>





        </Form >
    );

    const onEdit = async (item: Schedule) => {
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

    const columns: ColumnsType<Schedule> = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            width: 300,
            // sorter: {
            //     compare: (a, b) => a?.trainer.localeCompare(b?.trainer),
            // },
        },
        {
            title: 'Day',
            dataIndex: 'day',
            width: 300,
            sorter: {
                compare: (a, b) => a?.day.localeCompare(b?.day),
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            sorter: {
                compare: (a, b) => a.startTime?.localeCompare(b?.startTime),
            },
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            sorter: {
                compare: (a, b) => a.endTime?.localeCompare(b?.endTime),
            },
        },
        {
            title: 'Action',
            key: 'operation',
            align: 'center',
            width: 100,
            render: (_: any, record: Schedule) => (
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer('Add Schedule')}>
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
                content={<ScheduleForm />}
                width={420}
            />
        </div>
    )
}

export default Schedules
