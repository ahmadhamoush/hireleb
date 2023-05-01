export default function Loader({ name }) {
  return (
    <div id={'globalLoader'}>
      <div className="loader">
        <div />
        <div />
        <p>{name}</p>
      </div>
    </div>
  )
}
