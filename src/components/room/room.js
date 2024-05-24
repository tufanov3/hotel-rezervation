export const Room = ({ room }) => {
    return (
        <div className="room">
          <img src={room.image} alt={room.name} className="room-image" />
          <div className="room-info">
            <h2 className="room-name">{room.name}</h2>
            <p className="room-description">{room.description}</p>
            <p className="room-price">{room.price} ₽ за ночь</p>
          </div>
        </div>
      );
    
}