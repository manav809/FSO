const Notification = ({ notification, alertColor }) => {
  return (
    <div className={alertColor === 'added' ? 'added' : 'deleted'}>
      <h3>{notification}</h3>
    </div>
  );
};

export default Notification;
