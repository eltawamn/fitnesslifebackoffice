import React from 'react';
import { InputNumber, Form, Input, Modal } from 'antd';
import { api } from '../../config/api';
import { toast } from 'react-toastify';

export const AddPackModal = ({ isOpen, onCancel, onSave }) => {
    const [form] = Form.useForm();

    const onOk = async () => {
        try {
            const pack = await form.validateFields();

            await api.post(`/packs`, pack);

            onSave(pack)

            toast.success("Pack ajouter !")

            onCancel()
        } catch(err) {
            console.error(err)
        }
    }

    return <Modal 
        title="Ajout d'un pack" 
        open={isOpen} 
        onCancel={onCancel}
        onOk={onOk}
        cancelText="Retour"
        okText="Ajouter"
        destroyOnClose
    >
        <Form
            form={form}
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            autoComplete="off"
        >
            <Form.Item
            label="Titre"
            name="title"
            rules={[
                {
                required: true,
                message: "Entrer le titre s'il vous plait !",
                },
            ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label="Prix"
            name="price"
            rules={[
                {
                required: true,
                message: "Entrer le prix s'il vous plait !",
                },
            ]}
            >
                <InputNumber min={1} />
            </Form.Item>
        </Form>
    </Modal>
}