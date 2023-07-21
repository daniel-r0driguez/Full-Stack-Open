const Notification = ({message, success}) => {
    if (message === null)
    {
        return null;
    }

    const _className = (success) ? 'notification' : 'error';

    return (
        <div className={_className}>
            {message}
        </div>
    );
};

export default Notification;