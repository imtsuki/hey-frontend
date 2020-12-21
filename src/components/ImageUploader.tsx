import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import { useToast } from '@chakra-ui/react';
import 'react-dropzone-uploader/dist/styles.css';

export const ImageUploader: React.FC<{
  onUploadFinished?: (imageUrl: string) => void;
  onImageRemoved?: () => void;
}> = ({ onUploadFinished, onImageRemoved }) => {
  const toast = useToast();
  const getUploadParams = () => {
    return { url: 'http://127.0.0.1:4000/api/upload' };
  };

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta, remove, xhr },
    status
  ) => {
    if (status === 'done') {
      toast({ title: `图片上传成功` });
      if (onUploadFinished) {
        const res = JSON.parse(xhr?.response);
        onUploadFinished(res.picture);
      }
    } else if (status === 'aborted') {
      toast({ title: `图片上传失败` });
    } else if (status === 'removed') {
      if (onImageRemoved) {
        onImageRemoved();
      }
    }
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="点击或拖动上传"
      styles={{
        dropzone: {
          border: '1px solid',
          borderColor: 'inherit',
          borderRadius: '0.375rem',
        },
        inputLabel: {
          color: 'gray',
        },
      }}
    />
  );
};
