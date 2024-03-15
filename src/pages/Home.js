import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Typography, Row } from 'antd';
import { toast } from 'react-toastify';
import { api } from '../config/api';
import { AddPackModal } from '../components/Modals/AddPackModal';
import { EditPackModal } from '../components/Modals/EditPackModal';

const { Title } = Typography;


export const HomePage = () => {
  const [packs, setPacks] = useState([]);
  const [addPackModalIsOpen, setAddPackModalIsOpen] = useState(false);
  const [editPackModalIsOpen, setEditPackModalIsOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  useEffect(() => {
    try {
      const getPacks = async () => {
        const response = await api.get('/packs');
        setPacks(response?.data || []);
      };
      getPacks();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const onDelete = async (packId) => {
    try {
      if (!packId) return;
      await api.delete(`/packs/${packId}`);
      const newPacks = packs.filter((pack) => pack._id !== packId);
      setPacks(newPacks);
      toast.success("Pack supprimé !");
    } catch (err) {
      console.error(err);
    }
  };

  const onAddPack = (pack) => {
    setPacks([...packs, pack]);
  };

  const onEditPack = (pack) => {
    setSelectedPack(pack);
    setEditPackModalIsOpen(true);
  };

  const onSaveEditedPack = (editedPack) => {
    const updatedPacks = packs.map((pack) =>
      pack._id === editedPack._id ? editedPack : pack
    );

    console.log(packs, editedPack)

    setPacks(updatedPacks);
  };

  const onOpenAddPackModal = () => setAddPackModalIsOpen(true);

  const onCloseEditPackModal = () => {
    setEditPackModalIsOpen(false);
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (pack) => (
        <Space size="middle">
          <Button onClick={() => onEditPack(pack)}>Éditer</Button>
          <Button danger onClick={() => onDelete(pack?._id)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div>
      <AddPackModal
        isOpen={addPackModalIsOpen}
        onCancel={() => setAddPackModalIsOpen(false)}
        onSave={onAddPack}
      />
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Title level={2} style={{ margin: 0 }}>
          Nos packs
        </Title>
        <Button type="primary" onClick={onOpenAddPackModal}>
          Ajouter un pack
        </Button>
      </Row>
      <Table columns={columns} dataSource={packs} />

      <EditPackModal
        isOpen={editPackModalIsOpen}
        packData={selectedPack}
        onCancel={onCloseEditPackModal}
        onSave={onSaveEditedPack}
      />
    </div>
  );
};
