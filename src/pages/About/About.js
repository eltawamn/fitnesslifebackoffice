import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { api } from '../../config/api';
import style from './About.css';

const columns = [
  {
    title: 'Nom',
    dataIndex: 'nom',
    key: 'nom',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Avis',
    dataIndex: 'commentaire',
    key: 'commentaire',
  },
];

export const AboutPage = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    try {
      const getAbouts = async () => {
        const response = await api.get('/avis');

        setAbout(response?.data || []);
      };

      getAbouts();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return  <Table columns={columns} dataSource={about} />
}
