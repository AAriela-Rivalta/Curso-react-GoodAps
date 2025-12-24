import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/swiper-bundle.css';

export function TopTicker() {
  const messages = [
    "DummyJSON",
    "PRODUCTOS RANDOM",
    "USUARIOS RANDOM",
    "OFERTAS ÚNICAS",
    "ENVÍOS A TODO EL PAÍS"
  ];

  return (
    <div className="bg-[#cd6d22] text-white py-2 overflow-hidden border-b border-white/10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={'auto'} // Clave para que se vean varios mensajes
        loop={true}
        speed={5000} // Velocidad del movimiento (más alto = más lento)
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false} // Evita que el usuario lo frene
        className="ticker-swiper"
      >
        {/* Repetimos los mensajes varias veces para que no haya huecos en el loop */}
        {[...messages, ...messages].map((text, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <span className="text-sm font-medium uppercase tracking-widest whitespace-nowrap">
              {text} <span className="mx-8 opacity-30">•</span>
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}