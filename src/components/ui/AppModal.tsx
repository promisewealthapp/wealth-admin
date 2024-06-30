import { Modal } from "antd";
import { ReactNode, useState } from "react";

type TAppModalProps = {
  button: ReactNode;
  children: ReactNode;
  title?: string;
  primaryButtonTitle?: string;
  primaryButtonAction?: () => void;
  cancelButtonTitle?: string;
  cancelButtonAction?: () => void;
  handleClose?: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => void;
  modalOpen?: boolean,
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
};

const AppModal = ({
  button,
  title,
  children,
  primaryButtonTitle,
  primaryButtonAction,
  cancelButtonTitle,
  cancelButtonAction,
  modalOpen,
  setModalOpen
}: TAppModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (value: boolean) => {
    if (setModalOpen) {
      setModalOpen(value);
    } else {
      setOpen(value);
    }
  }
  return (
    <div className="">
      <div onClick={() => handleOpen(true)}>{button}</div>
      <Modal
        title={title}
        centered
        open={modalOpen === undefined ? open : modalOpen}
        onOk={() => handleOpen(false)}
        onCancel={() => handleOpen(false)}
        footer={
          (primaryButtonTitle || cancelButtonTitle) ? <div className="max-w-80 flex items-center justify-center gap-2 lg:pt-2">
            {cancelButtonTitle && (
              <button
                onClick={() => {
                  handleOpen(false);
                  if (cancelButtonAction) {
                    cancelButtonAction();
                  }
                }}
                className="roundedBtn text-textDark bg-[#E8E8E8] text-sm"
              >
                {cancelButtonTitle}
              </button>
            )}

            {primaryButtonTitle && (
              <button
                onClick={() => {
                  handleOpen(false);
                  if (primaryButtonAction) {
                    primaryButtonAction();
                  }
                }}
                className="roundedBtn text-sm"
              >
                {primaryButtonTitle}
              </button>
            )}
          </div> : []
        }
      >
        {children}
      </Modal>
    </div>
  );
};

export default AppModal;
