import { Modal } from 'antd';
import Styled from 'styled-components';

const ModalStyledColored = (type: string, theme: any) => `
  .ant-modal-content, .ant-modal-header {
    background-color: ${type !== 'default' && theme[`${type}-color`]} !important;
  }
  .ant-modal-title {
    color: #fff;
  }
  .ant-modal-content{
    .ant-modal-close-x{
      svg{
        color: #fff;
      }
    }
    p{
      color: #fff;
    }
  }
  .ant-modal-footer button {
    background: #fff;
    color: #999;
    border: 1px solid #ffff;
  }
`;

const ModalStyled = Styled(Modal)`    
  ${({ theme, type }: { theme: any, type?: string }) => type && ModalStyledColored(type, theme)}
`;

export { ModalStyled, ModalStyledColored };
