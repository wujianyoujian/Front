import { useState } from 'react'
import { Button, Modal, Input, Select, message } from 'antd'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="app">
      <h3>React + Ant Design 子应用</h3>

      <Button
        type="primary"
        onClick={() => message.success('Ant Design message —— 检查它有没有样式')}
      >
        打开 message（Portal）
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={() => setOpen(true)}>
        打开 Modal（Portal）
      </Button>

      <br />
      <br />
      <Input placeholder="输入框（观察全局样式）" style={{ width: 260 }} />
      <Select
        placeholder="下拉框"
        style={{ width: 160, marginTop: 12 }}
        options={[
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ]}
      />

      <Modal
        title="测试弹窗"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <p>弹窗内容 —— strictStyleIsolation 下默认会裸奔，靠 patch 修复</p>
      </Modal>
    </div>
  )
}
