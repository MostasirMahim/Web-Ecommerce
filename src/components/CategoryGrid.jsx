import { PropTypes } from "prop-types";
function CategoryGrid({ title, items, linkText }) {
  return (
    <div>
      <div className=" p-2 shadow-md rounded-lg ">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-2 gap-4 mb-1 w-full ">
          {items?.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.imgSrc}
                alt={item.label}
                className="w-full h-24 object-contain rounded-lg"
              />
              <p className="text-center ">{item.label}</p>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-500 hover:underline mt-1">
          {linkText}
        </a>
      </div>
    </div>
  );
}

CategoryGrid.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default CategoryGrid;
