import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "../form";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";
import {
  Button,
  Space,
  Row,
  Col,
  Dropdown,
  Card,
  Form,
  Select,
  Input,
  Radio,
  //   DatePicker,
  Table,
} from "antd";
import type { ColumnsType, TableRowSelection } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

interface DataType {
  key: number;
  firstname: string;
  lastname: string;
  gender: number;
  phone: string;
  nationality: string;
  citizenID?: string;
  passport?: string;
  salary?: string;
}

const SPA: React.FC = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const [formInstance] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const columns: ColumnsType<DataType> = [
    {
      title: t("name"),
      dataIndex: "firstname",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
      width: "20%",
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      sorter: (a, b) => a.gender - b.gender,
      width: "10%",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      width: "20%",
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      filters: [
        { text: "Thailand", value: "thai" },
        { text: "USA", value: "usa" },
      ],
      onFilter: (value, record) =>
        record.nationality.indexOf(value as string) === 0,
      width: "20%",
    },
    {
      title: t("manage"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: "30%",
    },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items = [
    { key: "1", label: <a onClick={() => changeLanguage("en")}>English</a> },
    { key: "2", label: <a onClick={() => changeLanguage("th")}>Thai</a> },
  ];

  const handleReset = () => {
    formInstance.resetFields();
    dispatch(resetForm());
    localStorage.removeItem("editingKey");
  };

  const handleSubmit = (values: any) => {
    console.log("Form values submitted:", values);

    if (values.citizenID) {
      console.log("Citizen ID:", values.citizenID);
    }

    const editingKey = localStorage.getItem("editingKey");
    if (editingKey) {
      // Update existing entry
      const updatedData: DataType[] = [];
      const currentIndex = parseInt(
        localStorage.getItem("currentIndex") || "0",
        10
      );
      for (let i = 1; i <= currentIndex; i++) {
        const item = localStorage.getItem(`formData-${i}`);
        if (item) {
          const itemData = JSON.parse(item);
          if (i.toString() === editingKey) {
            updatedData.push({ key: i, ...values });
          } else {
            updatedData.push({ key: i, ...itemData });
          }
        }
      }
      setDataSource(updatedData);
      localStorage.setItem(`formData-${editingKey}`, JSON.stringify(values));
      localStorage.removeItem("editingKey");
    } else {
      // New entry
      const currentIndex =
        parseInt(localStorage.getItem("currentIndex") || "0", 10) + 1;
      localStorage.setItem(`formData-${currentIndex}`, JSON.stringify(values));
      localStorage.setItem("currentIndex", currentIndex.toString());

      // Update the dataSource
      const updatedData: DataType[] = [];
      for (let i = 1; i <= currentIndex; i++) {
        const item = localStorage.getItem(`formData-${i}`);
        if (item) {
          updatedData.push({ key: i, ...JSON.parse(item) });
        }
      }
      setDataSource(updatedData);
    }

    formInstance.resetFields();
    dispatch(resetForm());

    Swal.fire({
      icon: "success",
      title: t("formSubmitted"),
      text: t("formSubmittedText"),
      showConfirmButton: true,
    });
  };

  useEffect(() => {
    formInstance.setFieldsValue(form);

    const data: DataType[] = [];
    const currentIndex = parseInt(
      localStorage.getItem("currentIndex") || "0",
      10
    );

    for (let i = 1; i <= currentIndex; i++) {
      const item = localStorage.getItem(`formData-${i}`);
      if (item) {
        data.push({ key: i, ...JSON.parse(item) });
      }
    }

    setDataSource(data);
  }, [form, formInstance]);

  const handleCitizenIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");

    const formattedValue = value.replace(
      /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
      "$1-$2-$3-$4-$5"
    );

    const currentValues = formInstance.getFieldsValue();
    formInstance.setFieldsValue({
      ...currentValues,
      citizenID: formattedValue,
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as number[]);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleEdit = (record: DataType) => {
    // Set form values with the selected record
    formInstance.setFieldsValue(record);

    // Optionally store the key of the item being edited
    localStorage.setItem("editingKey", record.key.toString());
  };

  const handleDelete = (key: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action will permanently delete the item.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove item from localStorage
        const currentIndex = parseInt(
          localStorage.getItem("currentIndex") || "0",
          10
        );
        localStorage.removeItem(`formData-${key}`);

        // Rebuild the data source
        const updatedData: DataType[] = [];
        for (let i = 1; i <= currentIndex; i++) {
          const item = localStorage.getItem(`formData-${i}`);
          if (item) {
            updatedData.push({ key: i, ...JSON.parse(item) });
          }
        }
        setDataSource(updatedData);
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRowKeys([]);
      setSelectAll(false);
    } else {
      setSelectedRowKeys(dataSource.map((data) => data.key));
      setSelectAll(true);
    }
  };

  const handleDeleteSelected = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action will permanently delete the selected items.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const keysToDelete = selectedRowKeys;
        const currentIndex = parseInt(
          localStorage.getItem("currentIndex") || "0",
          10
        );

        keysToDelete.forEach((key) => {
          localStorage.removeItem(`formData-${key}`);
        });

        // Rebuild the data source
        const updatedData: DataType[] = [];
        for (let i = 1; i <= currentIndex; i++) {
          const item = localStorage.getItem(`formData-${i}`);
          if (item) {
            updatedData.push({ key: i, ...JSON.parse(item) });
          }
        }
        setDataSource(updatedData);
        setSelectAll(false);
      }
    });
  };

  return (
    <>
      <Row justify="center" style={{ marginBottom: "20px", padding: "10px" }}>
        <Col span={18}>
          <h1>{t("table")}</h1>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Space>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Button>{t("translate")}</Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={24} md={18} lg={16}>
          <Card style={{ width: "100%" }}>
            <Form
              form={formInstance}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              autoComplete="off"
              onFinish={handleSubmit}
            >
              {/* Form Items */}
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="title"
                    label={t("title")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder={t("selectTitle")}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Mr">{t("mr")}</Select.Option>
                      <Select.Option value="Ms">{t("ms")}</Select.Option>
                      <Select.Option value="Mrs">{t("mrs")}</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="firstname"
                    label={t("firstname")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="lastname"
                    label={t("lastname")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="gender"
                    label={t("gender")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value="male">{t("male")}</Radio>
                      <Radio value="female">{t("female")}</Radio>
                      <Radio value="unsex">{t("unsex")}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                <Form.Item
                  name="countryCode"
                  label={t("countryCode")}
                  labelAlign="left"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder={t("selectCountryCode")}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="+66">+66 (Thailand)</Select.Option>
                    <Select.Option value="+33">+33 (France)</Select.Option>
                    <Select.Option value="+1">+1 (USA)</Select.Option>
                  </Select>
                </Form.Item>
              </Col> */}
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label={t("phone")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Input maxLength={15} placeholder={t("enterPhone")} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="nationality"
                    label={t("nationality")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder={t("selectNationality")}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="Thailand">
                        {t("thailand")}
                      </Select.Option>
                      <Select.Option value="USA">{t("usa")}</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="citizenID"
                    label={t("citizenID")}
                    labelAlign="left"
                  >
                    <Input onChange={handleCitizenIDChange} maxLength={15} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="passport"
                    label={t("passport")}
                    labelAlign="left"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="salary"
                    label={t("salary")}
                    labelAlign="left"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("submit")}
                </Button>
                <Button style={{ marginLeft: "10px" }} onClick={handleReset}>
                  {t("reset")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Button onClick={handleSelectAll} style={{ marginRight: "10px" }}>
            {selectAll ? "Deselect All" : "Select All"}
          </Button>
          <Button danger onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            bordered
          />
        </Col>
      </Row>
    </>
  );
};

export default SPA;
