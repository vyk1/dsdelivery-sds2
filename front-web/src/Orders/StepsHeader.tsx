import './styles.css'

export default function StepsHeader() {
  return (
    <header className="orders-steps-container">
      <div className="orders-steps-content">
        <h1 className="steps-title">SIGA AS<br /> ETAPAS</h1>
      </div>
      <ul className="steps-items">
        <li>
          <span className="steps-number">1</span>
          Selecione os produtos e a localização
        </li>
        <li>
          <span className="steps-number">2</span>
          Depois clique em <b>"ENVIAR PEDIDO"</b>
        </li>

      </ul>
    </header>
  )
}