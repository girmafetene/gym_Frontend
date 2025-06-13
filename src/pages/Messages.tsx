import Table, { ColumnsType } from "antd/es/table";
import { Message } from "../types/category";
import { Button, message, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { apiService } from "../api/apiService";
 

 
const Messages = () => {
  
    const [MessageList, setMessageList] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        GetMessages()
    }, [])
    
     const GetMessages= ()=>{
        setloading(true)
        apiService.getAll("message").then(Respons=>{
          setloading(false)
          setMessageList(Respons?.data)
        })
     }


    const handleDelete = async (id: string) => {
        apiService.remove("message", id).then((response) => {
          message.success('message Delete successfully');
          GetMessages();
       });
      };
    const columns: ColumnsType<Message> = [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 300,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          width: 100,
        },
        {
          title: 'Message',
          dataIndex: 'message',
          width: 400,
        },
        {
          title: 'Date',
          dataIndex: 'date',
        },
    
        {
          title: 'Action',
          key: 'operation',
          align: 'center',
          width: 100,
          render: (_: any, record: Message) => (
            <div className="flex w-full justify-center text-gray space-x-3">
              
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
   
    return (
    <div>

                       <Table
                        rowKey="id"
                        size="small"
                        scroll={{ x: 'max-content' }}
                        pagination={{ pageSize: 10 }}
                        columns={columns}
                        dataSource={MessageList}
                        loading={loading}

                    />
    </div>
  )
}

export default Messages
