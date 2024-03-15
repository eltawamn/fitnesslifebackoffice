import React, { useState, useEffect } from 'react';
import { InputNumber, Form, Input, Modal } from 'antd';
import { api } from '../../config/api';
import { toast } from 'react-toastify';

export const EditPackModal = ({ isOpen, packData, onCancel, onSave }) => {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState(packData);

    // Mettre à jour initialValues lorsque packData change
    useEffect(() => {
        setInitialValues(packData);
    }, [packData]);

    // Fonction de gestion de l'événement de soumission du formulaire d'édition
    const onOk = async () => {
        try {
            const updatedPack = await form.validateFields();

            // Envoyer une requête API pour mettre à jour le pack
            await api.put(`/packs/${packData._id}`, updatedPack);

            onSave({
                ...packData,
                ...updatedPack
            });

            toast.success("Pack mis à jour !");

            onCancel();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Modal 
            title="Modifier le pack" 
            visible={isOpen} 
            onCancel={onCancel}
            onOk={onOk}
            cancelText="Retour"
            okText="Enregistrer"
            destroyOnClose
        >
            <Form
                form={form}
                name="editPackForm"
                initialValues={initialValues}
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
                            message: "Veuillez entrer le titre !",
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
                            message: "Veuillez entrer le prix !",
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
