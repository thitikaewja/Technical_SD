import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Row, Col, Button, Dropdown, Space, Menu, Image, Card } from "antd";
import type { MenuProps } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

function MovePosition() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => changeLanguage("en")}>English</a>,
    },
    {
      key: "2",
      label: <a onClick={() => changeLanguage("th")}>Thai </a>,
    },
  ];

  const [img, setImg] = useState<string[]>([
    "https://www.pngarts.com/files/11/Colorful-Triangle-Free-PNG-Image.png",
    "https://cdn.icon-icons.com/icons2/215/PNG/256/rectangle256_25205.png",
    "https://png.pngtree.com/png-vector/20240519/ourmid/pngtree-pentagonal-logo-design-vector-png-image_12492396.png",
    "https://www.pngall.com/wp-content/uploads/2016/04/Hexagon-PNG-Picture.png",
    "https://cdn.icon-icons.com/icons2/321/PNG/512/Circle_34541.png",
    "https://cdn-icons-png.flaticon.com/512/4740/4740889.png",
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % img.length);
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + img.length) % img.length
    );
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * img.length);
    setCurrentIndex(randomIndex);
  };

  const handlePosition = () => {
    const half = Math.ceil(img.length / 2);
    const reorderedColors = [
      ...img.slice(currentIndex),
      ...img.slice(0, currentIndex),
    ];
    const topRow = reorderedColors.slice(0, half);
    const bottomRow = reorderedColors.slice(half);
    const swappedColors = [...bottomRow, ...topRow];
    setImg(swappedColors);
    setCurrentIndex(0);
  };

  const reorderedColors = [
    ...img.slice(currentIndex),
    ...img.slice(0, currentIndex),
  ];

  return (
    <>
      <div>
        <Row gutter={16} justify="end" style={{ margin: "20px", gap: "10px" }}>
          <Col>
            <Space direction="vertical" style={{ margin: "20px" }}>
              <Dropdown
                overlay={<Menu items={items} />}
                placement="bottomLeft"
                arrow
              >
                <Button>{t("translate")}</Button>
              </Dropdown>
            </Space>
          </Col>
        </Row>

        <Row
          gutter={16}
          justify="center"
          style={{ margin: "20px", gap: "10px" }}
        >
          {reorderedColors.map((color, index) => (
            <Col span={6} key={index}>
              <Card
                onClick={handleRandom}
                style={{
                  cursor: "pointer",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image height={150} src={color} preview={false} />
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handlePrevious} style={{ margin: "0 10px" }}>
              <LeftOutlined /> {t("position")}
            </Button>

            <Button onClick={handlePosition} style={{ margin: "0 10px" }}>
              <UpOutlined /> {t("positionTop")} <DownOutlined />
            </Button>

            <Button onClick={handleNext} style={{ margin: "0 10px" }}>
              {t("position")} <RightOutlined />
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MovePosition;
