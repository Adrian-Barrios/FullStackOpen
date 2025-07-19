const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={String(type)}>
      {message}
    </div>
  )
}

export default Notification