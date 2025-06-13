import React from "react";
import { Drawer, Button } from "antd";

interface RightDrawerProps {
  content: React.ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  width?: number; // Make width optional
}

const AddAndEditDrawer: React.FC<RightDrawerProps> = ({
  content,
  title,
  open,
  onClose,
  onSave,
  width = 400, // Default width set to 400px
}) => {
  return (
    <Drawer
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{title}</span>
          <div>
            <Button onClick={onClose} danger>
              Close
            </Button>
            <Button onClick={onSave} type="primary" style={{ marginLeft: 8 }}>
              Save
            </Button>
          </div>
        </div>
      }
      placement="right"
      destroyOnClose={true}
      open={open}
      closable={false}
      width={width} // Set dynamic width
    >
      {content}
    </Drawer>
  );
};

export default AddAndEditDrawer;
