import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
import "./Slider.scss";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  // Temp image URLs — replace with your own
  const tempImages = [
    "https://wallpapers.com/images/hd/real-estate-modern-white-house-dcxpp5xsw4e7wqgc.jpg",
    // "https://wallpapers.com/images/featured/real-estate-pictures-bjhkvpnt3lm8zjdl.jpg",
    "https://hdestates.com/_next/static/media/photography.782ab6df.jpg",
    "https://wallpapers.com/images/hd/real-estate-modern-white-house-dcxpp5xsw4e7wqgc.jpg",
    // "https://wallpapers.com/images/featured/real-estate-pictures-bjhkvpnt3lm8zjdl.jpg",
  ];

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];

      querySnap.forEach((doc) => {
        const randomTempImage =
          tempImages[Math.floor(Math.random() * tempImages.length)];
        listings.push({
          id: doc.id,
          data: {
            ...doc.data(),
            tempImage: randomTempImage, // ← add temp image
          },
        });
      });

      setListings(listings);
      setLoading(false);
    }

    fetchListings();
  }, []);

  if (loading) return <Spinner />;
  if (listings.length === 0) return <></>;

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide key={id}>
              <div
                style={{
                  background: `url(${data.tempImage}) center center / cover no-repeat`,
                }}
                className="slider"
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div className="slider-content">
                  <h2 className="slider-title">
                    Experience <ul></ul>Eevated <ul></ul>Living
                  </h2>
                  <h2 className="slider-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec nec turpis dictum, eleifend justo vitae, aliquet arcu.
                    Nam euismod mattis urna, eu scelerisque dolor posuere a.
                  </h2>
                  <button className="slider-button">View Details</button>
                </div>
                {/* <p className="house-name">{data.name}</p> */}
                {/* <p className="house-price">
                  $ {data.discountedPrice ?? data.regularPrice}
                  {data.type === "rent" && " / month"}
                </p> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
