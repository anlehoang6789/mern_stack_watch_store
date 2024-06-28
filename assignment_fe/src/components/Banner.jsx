import { Carousel } from "rsuite";

// src/components/Banner.jsx
const Banner = () => {
  return (
    <Carousel autoplay className="custom-slider mb-4">
      <div className="relative w-full  flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdhdGNofGVufDB8MHwwfHx8MA%3D%3D"
          alt="Watch"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="relative w-full   flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605143185650-77944b152643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGNofGVufDB8MHwwfHx8MA%3D%3D"
          alt="Watch"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="relative w-full   flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdhdGNofGVufDB8MHwwfHx8MA%3D%3D"
          alt="Watch"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </Carousel>
  );
};

export default Banner;
