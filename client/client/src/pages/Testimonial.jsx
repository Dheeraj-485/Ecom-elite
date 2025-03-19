const Testimonial = ({ test }) => {
  return (
    <div
      key={test.id}
      className="bg-white shadow-lg rounded-lg p-6 min-w-[250px] md:min-w-[300px]"
    >
      <div className="flex items-center space-x-4">
        <img
          className="w-14 h-14 rounded-full border-2 border-blue-500"
          src={test.image}
          alt={test.name}
        />
        <div>
          <h3 className="text-lg font-semibold">{test.name}</h3>
          <p className="text-sm text-gray-500">{test.role}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700">"{test.review}"</p>
    </div>
  );
};

export default Testimonial;
