const features = [
  { id: 1, icon: "truck", text: "Free Shipping" },
  { id: 2, icon: "package", text: "Secure Packaging" },
  { id: 3, icon: "support", text: "24/7 Support" },
  { id: 4, icon: "shield", text: "Secure Payment" },
];

const Features = () => {
  return (
    <div className="bg-white py-4 shadow-md flex justify-around border border-solid border-slate-200">
      {features.map((feature) => (
        <div key={feature.id} className="flex items-center space-x-2">
          <i className={`rs-icon rs-icon-${feature.icon} text-xl`}></i>
          <span className="text-blue-400">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Features;
