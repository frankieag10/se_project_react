import "./ItemCard.css";
function ItemCard({ onSelectCard, item }) {
  return (
    <div className="card">
      <span className="card__text">{item.name}</span>
      <img
        src={item.link}
        className="card__image"
        alt="image item"
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
}
export default ItemCard;
