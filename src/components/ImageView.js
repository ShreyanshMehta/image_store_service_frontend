// import { useParams } from "react-router-dom"
import Layout from "./Layout";
import Image from "./Image";
import "../styles/imageview.css";
import "../styles/common.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ImageView = () => {
  let { albumId, imageId } = useParams();
  const [meta, setMeta] = useState([]);

  const getImage = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/album/${albumId}/images/${imageId}`
    );
    const data = await resp.data.data;
    setMeta(data[0]);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Layout>
      <div className="title">
        <h1>
          {meta.album_name} / {meta.image_name}{" "}
        </h1>
      </div>
      <div className="image-container">
        <Image
          id={meta.image_id}
          image_name={meta.image_name}
          created_at={meta.created_at}
          isViewMode="true"
        />
      </div>
    </Layout>
  );
};

export default ImageView;
