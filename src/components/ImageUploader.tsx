import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import { useToast } from '@chakra-ui/react';
import 'react-dropzone-uploader/dist/styles.css';

export const ImageUploader: React.FC<{
  onUploadFinished?: (imageUrl: string) => void;
  onImageRemoved?: () => void;
}> = ({ onUploadFinished, onImageRemoved }) => {
  const toast = useToast();
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' };
  };

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta, remove },
    status
  ) => {
    if (status === 'headers_received') {
      toast({ title: `图片上传成功` });
      if (onUploadFinished) {
        onUploadFinished('上传成功后的 URL');
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
