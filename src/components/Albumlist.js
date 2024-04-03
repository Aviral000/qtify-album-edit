import React, { useState, useEffect } from 'react';
import "./Albumlist.css";
import axios from "axios";
import Button from '@mui/material/Button';
import { CircularProgress, Tooltip } from '@mui/material';
import "./grid1.styles.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const SwiperComponent = ({ albumlist }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={6}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {albumlist !== undefined && albumlist.length > 0 ? (
        albumlist.map((album, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <Link to={`/album/${album.id}`}>
              <Tooltip title={`${album.songs.length} songs`} arrow>
                <div className="swiper-card">
                  <div className="swiper-body">
                    <img src={album.image} alt={album.title} />
                  </div>
                  <div className="album-name">{album.follows} Follows</div>
                </div>
              </Tooltip>
            </Link>
            <div className="album-title">{album.title}</div>
          </SwiperSlide>
        ))
      ) : (
        <div className='circularprogress'>
          <CircularProgress />
        </div>
      )}
    </Swiper>
  );
};

export default function Albumlist() {
  const [albumlist, setAlbumlist] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [newAlbumList, setNewAlbumList] = useState([]);
  const [showNewAll, setShowNewAll] = useState(false);

  const ApiCallForAlbums = async () => {
    try {
      const response = await axios.get("https://qtify-backend-labs.crio.do/albums/top");
      setAlbumlist(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const ApiCallForNewAlbums = async () => {
    try {
      const response = await axios.get("https://qtify-backend-labs.crio.do/albums/new");
      setNewAlbumList(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    ApiCallForAlbums();
    ApiCallForNewAlbums();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleShowNewAll = () => {
    setShowNewAll(!showNewAll);
  };

  const texttoggler = () => {
    return showAll ? "Collapse" : "Show All";
  }

  const newTexttoggler = () => {
    return showNewAll ? "Collapse" : "Show All";
  }

  return (
    <div style={{ margin: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className='album-heading'> Top Albums </div>
        <div style={{ marginRight: "2rem", color: "white" }}>
          <Button onClick={toggleShowAll} style={{ color: "#34C94B" }}>{texttoggler()}</Button>
        </div>
      </div>
      {!showAll && (
        <div className="swiper-container">
          <SwiperComponent
            albumlist={albumlist}
            showAll={false}
          />
        </div>
      )}
      {albumlist.length === 0 ? (
        <div className='circularprogress'>
          <CircularProgress />
        </div>
      ) : (showAll && (
        <div className="grid-container" style={{ marginBottom: "2rem" }}>
          {albumlist.map((album) => (
            <Link to={`/album/${album.id}`} key={album.id}>
              <Tooltip title={`${album.songs.length} songs`} arrow>
                <div className="top-album-card">
                  <div className="grid-item">
                    <div className="card-body">
                      <img src={album.image} alt={album.title} className='img-sizing' />
                    </div>
                    <div className='album-name'>{album.follows} Follows</div>
                  </div>
                  <div className='album-title'>{album.title}</div>
                </div>
              </Tooltip>
            </Link>
          ))}
        </div>
      ))}

      <hr color='#34C94B' />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        <div className='album-heading'> New Albums </div>
        <div style={{ marginRight: "2rem", color: "white" }}>
          <Button onClick={toggleShowNewAll} style={{ color: "#34C94B" }}>{newTexttoggler()}</Button>
        </div>
      </div>
      {!showNewAll && (
        <div className="swiper-container2">
          <SwiperComponent
            albumlist={newAlbumList}
          />
        </div>
      )}
      {newAlbumList.length === 0 ? (
        <div className='circularprogress'>
          <CircularProgress />
        </div>
      ) : (
        showNewAll && (
        <div className="grid-container">
          {newAlbumList.map((album) => (
            <Link to={`/album/${album.id}`} key={album.id}>
              <Tooltip title={`${album.songs.length} songs`} arrow>
                <div className="new-album-card">
                  <div className="grid-item">
                    <div className="card-body">
                      <img src={album.image} alt={album.title} className='img-sizing' />
                    </div>
                    <div className='album-name'>{album.follows} Follows</div>
                  </div>
                  <div className='album-title'>{album.title}</div>
                </div>
              </Tooltip>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}