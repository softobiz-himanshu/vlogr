import Icons from '@/components/Icons';
import { IUpload } from '@/interfaces/editor';
import { deleteUpload } from '@/store/slices/uploads/actions';
import { useAppDispatch } from '@/store/store';
import { Menu, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

type UploadItemMenuProps = {
    menuY: number;
    menuX: number;
    isMenuOpen: boolean;
    upload: IUpload;
    closeMenu: () => void
}

export default function UploadItemMenu({menuX, menuY, isMenuOpen, upload, closeMenu}: UploadItemMenuProps) {

    const dispatch = useAppDispatch();

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = upload.url;
        a.download = 'download';
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleDeleteUpload = async () => {
        try {
          dispatch(deleteUpload({ id: upload.id }));
          closeMenu();
        } catch (err) {
          console.log(err);
        }
      }

    return (

        <div style={{
            position: "fixed",
            top: menuY,
            left: menuX,
            zIndex: 99
        }}>
            <div style={{ position: "relative", zIndex: 999 }}>
                <Menu isOpen={isMenuOpen}>
                    <MenuList
                        sx={{
                            border: 'none',
                            boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <MenuItem onClick={handleDownload}>
                            <Icons.Download size={24} styles={{ marginRight: "21px" }} />
                            download
                        </MenuItem>

                        <MenuItem onClick={handleDeleteUpload}>
                            <Icons.Trash styles={{ marginRight: "21px" }} />
                            delete
                        </MenuItem>

                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}
