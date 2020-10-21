import React, {useContext, useCallback, useState, useEffect, useMemo} from 'react'
import Modal from 'SRC_COMP/antd/Modal'
import BasicButton from "SRC_COMP/basic/BasicButton";
import './index.less'

const TitleWrapper = props => {
  return <div className='titleWrapper'>
    <div className="leftBorder"></div>
    <div className='title'>{props.children}</div>
  </div>
}
const BasicModal = (props) => {
  const {
    children,
    onSave,
    onCancel,
    onSaveText,
    footerStyle = {textAlign: 'right'},
    onCancelText,
    footer,
    title,
    className,
    ...rest
  } = props
  const classNames = useMemo(() => {
    return className ? `commonModal ${className}` : `commonModal`
  }, [className])
  return (
    <React.Fragment>
      <Modal
        centered
        className={classNames}
        title={<TitleWrapper>{title}</TitleWrapper>}
        {...rest}
        onCancel={onCancel}
        maskClosable={false}
        footer={
          footer === undefined ? null : footer === null ? (
            <div className="listModalFooter">
              <BasicButton onClick={onCancel}
                           className={'modalCancelBtn'}>{onCancelText || '取消'}</BasicButton>
              <BasicButton onClick={onSave}
                           className={'modalSaveBtn'}>{onCancelText || '保存'}</BasicButton>
            </div>
          ) : (
            footer
          )
        }
      >
        {children}
      </Modal>
    </React.Fragment>
  )
}

export default BasicModal
